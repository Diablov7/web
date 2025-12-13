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
    
    // Suporta múltiplos chat_ids separados por vírgula
    // Exemplo: "426197451,-1001234567890" ou apenas "426197451"
    const chatIdsRaw = process.env.TELEGRAM_CHAT_ID || '426197451';
    const chatIds = chatIdsRaw.split(',').map(id => id.trim()).filter(id => id.length > 0);

    console.log('[sendTelegram] Using credentials', { hasToken: !!token, chatIdsCount: chatIds.length });

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
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            chat_id: targetChatId, 
            text: finalText,
            parse_mode: "Markdown" // Habilita formatação markdown (negritos, etc)
          }),
        });

        console.log('[sendTelegram] Telegram API response', { 
          chatId: targetChatId, 
          status: tgRes.status, 
          ok: tgRes.ok 
        });

        if (!tgRes.ok) {
          const errText = await tgRes.text();
          console.error('[sendTelegram] Telegram API error for chat', targetChatId, errText);
          return { chatId: targetChatId, success: false, error: errText };
        }

        return { chatId: targetChatId, success: true };
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

