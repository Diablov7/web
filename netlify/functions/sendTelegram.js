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
    const chatId = process.env.TELEGRAM_CHAT_ID || '426197451';

    console.log('[sendTelegram] Using credentials', { hasToken: !!token, hasChatId: !!chatId });

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
              `Name: ${name || "N/A"}`,
              `Email: ${email || "N/A"}`,
              ...(phone ? [`Phone: ${phone}`] : []),
              ...(telegram ? [`Telegram: ${telegram}`] : []),
              "",
              "📊 *PROJECT DETAILS*",
              `Type: ${projectType || "N/A"}`,
              `Budget: ${budgetRange || "N/A"}`,
              `Timeline: ${timeline || "N/A"}`,
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
            "🚀 New message from Wevolv3!",
            "",
            `Name: ${name || "N/A"}`,
            `Email: ${email || "N/A"}`,
            ...(phone ? [`Phone: ${phone}`] : []),
            ...(telegram ? [`Telegram: ${telegram}`] : []),
            "",
            `Message: ${message || ""}`,
          ].join("\n");
        })();

    console.log('[sendTelegram] Sending to Telegram API');
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat_id || chatId, text: finalText }),
    });

    console.log('[sendTelegram] Telegram API response', { status: tgRes.status, ok: tgRes.ok });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error('[sendTelegram] Telegram API error', errText);
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Telegram API error", details: errText }),
      };
    }

    console.log('[sendTelegram] Success!');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ ok: true }),
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

