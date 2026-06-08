// FILE: app/components/ContactSection.tsx
"use client";

import { useRef, useState } from "react";
import InputMask from "react-input-mask";
import { motion, useInView } from "framer-motion";

type FormData = {
  name: string;
  company: string;
  phone: string;
  segment: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const segments = [
  "Малый бизнес",
  "Средний бизнес",
  "Крупный бизнес",
  "Собственник / частное лицо",
];

const services = [
  "Финансовый аудит",
  "Налоговая оптимизация",
  "CFO на аутсорсе",
  "ML-дашборд",
  "Инвестиционная стратегия",
  "Не знаю — нужна консультация",
];

export default function ContactSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const [form, setForm] = useState<FormData>({
  name: "",
  company: "",
  phone: "+7",
  segment: "",
  message: "",
});
  const [selectedService, setSelectedService] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.phone.trim()) e.phone = "Введите телефон";
    if (!form.segment) e.segment = "Выберите сегмент";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
  if (!validate()) return;
  setStatus("loading");
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        phone: form.phone,
        segment: form.segment,
        service: selectedService,
        message: form.message,
      }),
    });
    if (!res.ok) throw new Error();
    setStatus("success");
  } catch {
    setStatus("error");
  }
};
  const inputStyle = (field: keyof FormData) => ({
    background: "rgba(255,255,255,0.03)",
    border: errors[field]
      ? "1px solid rgba(239,68,68,0.5)"
      : "1px solid rgba(99,102,241,0.15)",
    color: "#e2e8f0",
    outline: "none",
  });

  if (status === "success") {
    return (
      <section id="contact" className="relative py-24" style={{ background: "#080810" }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#818cf8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-3">Заявка отправлена!</h3>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Отвечу в течение 2 часов в рабочее время. Если срочно — пишите в Telegram.
            </p>
            <a href="https://t.me/abdigalia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-bold text-[13px] text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
              Написать в Telegram
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden" style={{ background: "#080810" }}>
      {/* Фон */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse, #a855f7 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Заголовок */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ background: "#a855f7" }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#a855f7" }} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
              Начать работу
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}>
            Оставьте{" "}
            <span style={{
              background: "linear-gradient(135deg, #818cf8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              заявку
            </span>
          </h2>
          <p className="text-slate-600 text-[15px]">
            Бесплатная 30-минутная консультация · Отвечу в течение 2 часов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

          {/* ── ФОРМА ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8"
            style={{ background: "#0d0d1a", border: "1px solid rgba(99,102,241,0.12)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Имя */}
              <div>
                <label className="block text-[11px] font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: "#818cf8" }}>
                  Имя *
                </label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-[14px] transition-all duration-200 placeholder:text-slate-700"
                  style={inputStyle("name")}
                />
                {errors.name && (
                  <p className="text-[11px] mt-1" style={{ color: "#f87171" }}>{errors.name}</p>
                )}
              </div>

              {/* Компания */}
              <div>
                <label className="block text-[11px] font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: "#818cf8" }}>
                  Компания
                </label>
                <input
                  type="text"
                  placeholder="Название компании"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-[14px] transition-all duration-200 placeholder:text-slate-700"
                  style={inputStyle("company")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Телефон */}
              <div>
                <label className="block text-[11px] font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: "#818cf8" }}>
                  Телефон / Telegram *
                </label>
              <InputMask
  mask="+7 (999) 999-99-99"
  value={form.phone}
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
>
  {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...inputProps}
      type="tel"
      placeholder="+7 (705) 240-04-40"
      className="w-full px-4 py-3 rounded-xl text-[14px] transition-all duration-200 placeholder:text-slate-700"
      style={inputStyle("phone")}
    />
  )}
</InputMask>
                {errors.phone && (
                  <p className="text-[11px] mt-1" style={{ color: "#f87171" }}>{errors.phone}</p>
                )}
              </div>

              {/* Сегмент */}
              <div>
                <label className="block text-[11px] font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: "#818cf8" }}>
                  Тип бизнеса *
                </label>
                <select
                  value={form.segment}
                  onChange={(e) => setForm({ ...form, segment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-[14px] transition-all duration-200 cursor-pointer"
                  style={{ ...inputStyle("segment"), color: form.segment ? "#e2e8f0" : "#334155" }}
                >
                  <option value="" disabled style={{ background: "#0d0d1a" }}>Выберите...</option>
                  {segments.map((s) => (
                    <option key={s} value={s} style={{ background: "#0d0d1a" }}>{s}</option>
                  ))}
                </select>
                {errors.segment && (
                  <p className="text-[11px] mt-1" style={{ color: "#f87171" }}>{errors.segment}</p>
                )}
              </div>
            </div>

            {/* Выбор услуги */}
            <div className="mb-4">
              <label className="block text-[11px] font-semibold mb-2 uppercase tracking-widest"
                style={{ color: "#818cf8" }}>
                Интересующая услуга
              </label>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedService(selectedService === s ? "" : s)}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
                    style={{
                      background: selectedService === s
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(255,255,255,0.03)",
                      border: selectedService === s
                        ? "1px solid rgba(99,102,241,0.4)"
                        : "1px solid rgba(255,255,255,0.06)",
                      color: selectedService === s ? "#818cf8" : "#475569",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Сообщение */}
            <div className="mb-6">
              <label className="block text-[11px] font-semibold mb-2 uppercase tracking-widest"
                style={{ color: "#818cf8" }}>
                Расскажите о задаче
              </label>
              <textarea
                placeholder="Опишите ситуацию — что беспокоит, что хотите улучшить..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-[14px] transition-all duration-200 placeholder:text-slate-700 resize-none"
                style={inputStyle("message")}
              />
            </div>

            {/* Кнопка */}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="w-full py-4 rounded-xl font-bold text-[14px] text-white transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                boxShadow: "0 0 30px rgba(99,102,241,0.3)",
                opacity: status === "loading" ? 0.7 : 1,
              }}
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Отправляем...
                </>
              ) : (
                <>
                  Отправить заявку
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-700 mt-3">
              * Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </motion.div>

          {/* ── КОНТАКТЫ ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Мессенджеры */}
            {[
              {
                name: "Telegram",
                handle: "@abdigalia",
                href: "https://t.me/abdigalia",
                color: "#6366f1",
                icon: (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.942z" />
                  </svg>
                ),
              },
              {
                name: "WhatsApp",
                handle: "+7 777 000 00 00",
                href: "https://wa.me/77770000000",
                color: "#22c55e",
                icon: (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.552 4.116 1.517 5.849L.057 24l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.368l-.36-.214-3.733.979 1-3.647-.234-.374A9.818 9.818 0 1112 21.818z" />
                  </svg>
                ),
              },
            ].map((contact) => (
              <a key={contact.name} href={contact.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 group"
                style={{
                  background: "#0d0d1a",
                  border: "1px solid rgba(99,102,241,0.1)",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${contact.color}15`, color: contact.color }}>
                  {contact.icon}
                </div>
                <div>
                  <div className="text-[12px] text-slate-600 mb-0.5">{contact.name}</div>
                  <div className="text-[15px] font-bold text-white">{contact.handle}</div>
                </div>
                <svg className="ml-auto w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}

            {/* Режим работы */}
            <div className="p-5 rounded-2xl"
              style={{ background: "#0d0d1a", border: "1px solid rgba(99,102,241,0.1)" }}>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "#818cf8" }}>
                Режим работы
              </div>
              {[
                { day: "Пн — Пт", time: "09:00 — 19:00" },
                { day: "Суббота", time: "10:00 — 15:00" },
                { day: "Воскресенье", time: "Выходной" },
              ].map((row) => (
                <div key={row.day} className="flex justify-between py-2"
                  style={{ borderBottom: "1px solid rgba(99,102,241,0.06)" }}>
                  <span className="text-[13px] text-slate-500">{row.day}</span>
                  <span className="text-[13px] font-semibold text-slate-300">{row.time}</span>
                </div>
              ))}
            </div>

            {/* Локация */}
            <div className="p-5 rounded-2xl flex items-center gap-4"
              style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(99,102,241,0.15)" }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#818cf8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] text-slate-600 mb-0.5">Местоположение</div>
                <div className="text-[14px] font-semibold text-white">Астана, Казахстан</div>
                <div className="text-[12px] text-slate-600">Работаю дистанционно по всему РК</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
