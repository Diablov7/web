const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const { name, email, telegram, message, text, chat_id } = payload;

    // Usar env vars ou fallback hardcoded para garantir funcionamento
    const token = process.env.TELEGRAM_BOT_TOKEN || '7615783171:AAHjemZssJN-NOzIEb2jfitm0XEJ5YE2g9E';
    const chatId = process.env.TELEGRAM_CHAT_ID || '426197451';

    // Suporta dois formatos:
    // 1) { text, chat_id? } (proxy direto do front/bundle)
    // 2) { name, email, telegram, message } (formulários)
    const finalText = typeof text === "string" && text.trim().length > 0
      ? text
      : [
          "🚀 New message from Wevolv3!",
          "",
          `Name: ${name || "N/A"}`,
          `Email: ${email || "N/A"}`,
          `Telegram: ${telegram || "N/A"}`,
          "",
          `Message: ${message || ""}`,
        ].join("\n");

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat_id || chatId, text: finalText }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Telegram API error", details: errText }),
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Unexpected error", details: String(err) }),
    };
  }
};


