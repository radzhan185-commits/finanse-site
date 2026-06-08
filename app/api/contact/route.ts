import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, segment, service, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }

    const now = new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Almaty",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    const text = `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${name}
🏢 <b>Компания:</b> ${company || "—"}
📱 <b>Телефон/Telegram:</b> ${phone}
🏷 <b>Сегмент:</b> ${segment || "—"}
⚡ <b>Услуга:</b> ${service || "—"}
💬 <b>Сообщение:</b> ${message || "—"}

⏰ ${now}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) throw new Error("Telegram API error");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Ошибка отправки" }, { status: 500 });
  }
}