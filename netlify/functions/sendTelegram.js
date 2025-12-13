const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler = async (event) => {
  console.log('[sendTelegram] Function called', {
    method: event.httpMethod,
    hasBody: !!event.body,
    path: event.path
  });

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const { name, email, telegram, message, text, chat_id, phone, projectType, budgetRange, timeline, mainChallenge, additionalMessage } = payload;

    console.log('[sendTelegram] Payload received', { 
      hasName: !!name, 
      hasEmail: !!email, 
      hasProjectType: !!projectType,
      hasBudgetRange: !!budgetRange,
      hasTimeline: !!timeline,
      hasMainChallenge: !!mainChallenge
    });

    // Usar env vars ou fallback hardcoded para garantir funcionamento
    const token = process.env.TELEGRAM_BOT_TOKEN || '7615783171:AAHjemZssJN-NOzIEb2jfitm0XEJ5YE2g9E';
    
    // Suporta múltiplos chat_ids separados por vírgula, ponto e vírgula, ou quebra de linha
    // Também suporta variável alternativa TELEGRAM_CHAT_ID_GROUP para grupos
    // Exemplo: "426197451,-1001234567890" ou "426197451;-1001234567890" ou "426197451\n-1001234567890"
    const chatIdsRaw = process.env.TELEGRAM_CHAT_ID || '426197451';
    const groupChatIdRaw = process.env.TELEGRAM_CHAT_ID_GROUP || '';
    
    // Log do valor bruto (sem expor completamente por segurança)
    console.log('[sendTelegram] Raw TELEGRAM_CHAT_ID', { 
      length: chatIdsRaw.length, 
      firstChars: chatIdsRaw.substring(0, 20),
      containsComma: chatIdsRaw.includes(','),
      containsSemicolon: chatIdsRaw.includes(';'),
      containsNewline: chatIdsRaw.includes('\n')
    });
    
    if (groupChatIdRaw) {
      console.log('[sendTelegram] TELEGRAM_CHAT_ID_GROUP found', { 
        length: groupChatIdRaw.length,
        firstChars: groupChatIdRaw.substring(0, 20)
      });
    }
    
    // Suporta vírgula, ponto e vírgula, ou quebra de linha como separador
    let chatIds = chatIdsRaw
      .split(/[,;\n]/) // Split por vírgula, ponto e vírgula, ou quebra de linha
      .map(id => id.trim()) // Remove espaços
      .filter(id => id.length > 0); // Remove vazios
    
    // Se TELEGRAM_CHAT_ID_GROUP estiver definido, adicionar ao array
    if (groupChatIdRaw) {
      const groupIds = groupChatIdRaw
        .split(/[,;\n]/)
        .map(id => id.trim())
        .filter(id => id.length > 0);
      chatIds = [...chatIds, ...groupIds];
    }

    console.log('[sendTelegram] Using credentials', { 
      hasToken: !!token, 
      chatIdsCount: chatIds.length,
      chatIds: chatIds // Log dos IDs parseados para debug
    });

    // Suporta três formatos:
    // 1) { text, chat_id? } (proxy direto do front/bundle)
    // 2) { name, email, telegram, message } (formulário antigo)
    // 3) { name, email, phone, telegram, projectType, budgetRange, timeline, mainChallenge, additionalMessage } (formulário novo)
    const finalText = typeof text === "string" && text.trim().length > 0
      ? text
      : (() => {
          // Novo formato com campos de auditoria
          if (projectType || budgetRange || timeline || mainChallenge) {
            const lines = [
              "🚀 *NEW CONTACT FORM SUBMISSION*",
              "",
              "👤 *CONTACT INFO*",
              `*Name:* ${name || "N/A"}`,
              `*Email:* ${email || "N/A"}`,
              ...(phone ? [`*Phone:* ${phone}`] : []),
              ...(telegram ? [`*Telegram:* ${telegram}`] : []),
              "",
              "📊 *PROJECT DETAILS*",
              `*Type:* ${projectType || "N/A"}`,
              `*Budget:* ${budgetRange || "N/A"}`,
              `*Timeline:* ${timeline || "N/A"}`,
              "",
              "🎯 *MAIN CHALLENGE/GOAL*",
              mainChallenge || "N/A",
              "",
            ];
            
            if (additionalMessage) {
              lines.push("📝 *ADDITIONAL DETAILS*", additionalMessage, "");
            }
            
            lines.push("─".repeat(30), `Sent from: wevolv3.com/contact.html`);
            
            return lines.join("\n");
          }
          
          // Formato antigo (fallback)
          return [
            "🚀 *New message from Wevolv3!*",
            "",
            `*Name:* ${name || "N/A"}`,
            `*Email:* ${email || "N/A"}`,
            ...(phone ? [`*Phone:* ${phone}`] : []),
            ...(telegram ? [`*Telegram:* ${telegram}`] : []),
            "",
            `*Message:*`,
            message || "",
          ].join("\n");
        })();

    console.log('[sendTelegram] Sending to Telegram API');
    
    // Determinar quais chat_ids usar (prioridade: chat_id do payload, depois env vars)
    const targetChatIds = chat_id ? [chat_id] : chatIds;
    
    // Enviar para todos os chat_ids especificados
    const sendPromises = targetChatIds.map(async (targetChatId) => {
      try {
        // Converter para string e garantir que é um número válido
        const chatIdStr = String(targetChatId).trim();
        const chatIdNum = chatIdStr.includes('-') ? chatIdStr : chatIdStr; // Manter como string para IDs negativos
        
        console.log('[sendTelegram] Attempting to send', { 
          chatId: chatIdNum, 
          type: typeof chatIdNum,
          length: chatIdNum.length
        });

        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            chat_id: chatIdNum, // Usar como string para suportar IDs negativos
            text: finalText,
            parse_mode: "Markdown" // Habilita formatação markdown (negritos, etc)
          }),
        });

        const responseData = await tgRes.json();
        
        console.log('[sendTelegram] Telegram API response', { 
          chatId: chatIdNum, 
          status: tgRes.status, 
          ok: tgRes.ok,
          response: responseData
        });

        if (!tgRes.ok) {
          console.error('[sendTelegram] Telegram API error for chat', chatIdNum, responseData);
          return { chatId: chatIdNum, success: false, error: JSON.stringify(responseData) };
        }

        console.log('[sendTelegram] Successfully sent to chat', chatIdNum);
        return { chatId: chatIdNum, success: true };
      } catch (err) {
        console.error('[sendTelegram] Error sending to chat', targetChatId, err);
        return { chatId: targetChatId, success: false, error: String(err) };
      }
    });

    // Aguardar todos os envios
    const results = await Promise.all(sendPromises);
    
    // Verificar se pelo menos um envio foi bem-sucedido
    const successCount = results.filter(r => r.success).length;
    const failedResults = results.filter(r => !r.success);

    if (successCount === 0) {
      // Nenhum envio foi bem-sucedido
      console.error('[sendTelegram] All sends failed', failedResults);
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: "Telegram API error - all sends failed", 
          details: failedResults 
        }),
      };
    }

    // Pelo menos um envio foi bem-sucedido
    if (failedResults.length > 0) {
      console.warn('[sendTelegram] Some sends failed', failedResults);
    }

    console.log('[sendTelegram] Success!', { 
      total: results.length, 
      successful: successCount, 
      failed: failedResults.length 
    });
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        ok: true, 
        sentTo: successCount,
        total: results.length,
        failed: failedResults.length > 0 ? failedResults : undefined
      }),
    };
  } catch (err) {
    console.error('[sendTelegram] Unexpected error', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Unexpected error", details: String(err), message: err.message, stack: err.stack }),
    };
  }
};

