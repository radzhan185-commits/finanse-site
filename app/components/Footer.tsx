// FILE: app/components/Footer.tsx
"use client";

import { motion } from "framer-motion";

const links = {
  services: [
    { label: "Финансовый аудит", href: "#services" },
    { label: "Налоговая оптимизация", href: "#services" },
    { label: "CFO на аутсорсе", href: "#services" },
    { label: "ML-дашборды", href: "#services" },
    { label: "Инвестиционная стратегия", href: "#services" },
  ],
  company: [
    { label: "Кейсы", href: "#cases" },
    { label: "FAQ", href: "#faq" },
    { label: "Оставить заявку", href: "#contact" },
  ],
  legal: [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Согласие на обработку ПД", href: "/consent" },
    { label: "Оферта", href: "/offer" },
  ],
};

const scrollTo = (href: string) => {
  if (href.startsWith("#")) {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{
      background: "#05050f",
      borderTop: "1px solid rgba(99,102,241,0.1)",
    }}>
      {/* Фон */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Верхняя часть */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 py-14">

          {/* Бренд */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-[13px]"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
                АГ
              </div>
              <span className="font-bold text-[16px] text-white">Абди Галия</span>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed max-w-xs mb-6">
              Стратегический финансовый советник для МСБ и крупного бизнеса в Казахстане.
              ML-аналитика, аудит, налоги, инвестиции.
            </p>

            {/* Мессенджеры */}
            <div className="flex gap-3">
              <a href="https://t.me/abdigalia" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                title="Telegram">
                <svg width="18" height="18" fill="#818cf8" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.942z" />
                </svg>
              </a>
              <a href="https://wa.me/77770000000" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
                title="WhatsApp">
                <svg width="18" height="18" fill="#22c55e" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.552 4.116 1.517 5.849L.057 24l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.368l-.36-.214-3.733.979 1-3.647-.234-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Услуги */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "#818cf8" }}>
              Услуги
            </h4>
            <ul className="space-y-2.5">
              {links.services.map((l) => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.href)}
                    className="text-[13px] text-slate-600 hover:text-slate-300 transition-colors duration-200 text-left">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "#818cf8" }}>
              Навигация
            </h4>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.href)}
                    className="text-[13px] text-slate-600 hover:text-slate-300 transition-colors duration-200 text-left">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "#818cf8" }}>
              Контакты
            </h4>
            <ul className="space-y-3">
              <li>
                <div className="text-[11px] text-slate-700 mb-0.5">Telegram</div>
                <a href="https://t.me/abdigalia" target="_blank" rel="noopener noreferrer"
                  className="text-[13px] text-slate-400 hover:text-white transition-colors">
                  @abdigalia
                </a>
              </li>
              <li>
                <div className="text-[11px] text-slate-700 mb-0.5">WhatsApp</div>
                <a href="https://wa.me/77770000000" target="_blank" rel="noopener noreferrer"
                  className="text-[13px] text-slate-400 hover:text-white transition-colors">
                  +7 777 000 00 00
                </a>
              </li>
              <li>
                <div className="text-[11px] text-slate-700 mb-0.5">Город</div>
                <span className="text-[13px] text-slate-400">Астана, Казахстан</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Разделитель */}
        <div className="h-px" style={{ background: "rgba(99,102,241,0.08)" }} />

        {/* Нижняя часть */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-[12px] text-slate-700">
              © {year} Абди Галия. Все права защищены.
            </p>
            <div className="flex gap-4">
              {links.legal.map((l) => (
                <a key={l.label} href={l.href}
                  className="text-[11px] text-slate-700 hover:text-slate-500 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Дисклеймер */}
          <p className="text-[10px] text-slate-800 max-w-xs text-center sm:text-right leading-relaxed">
            * Материалы не являются индивидуальной инвестиционной рекомендацией
          </p>
        </div>

      </div>
    </footer>
  );
}
