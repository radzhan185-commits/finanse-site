// FILE: app/components/PainSection.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Данные по сегментам ──────────────────────────────────────
const segments = [
  {
    tag: "Малый бизнес",
    tagColor: "#6366f1",
    title: "Платите налоги — но не знаете, переплачиваете ли?",
    pains: [
      "Бухгалтер ведёт учёт, но не даёт советов",
      "Налоговые проверки — как снег на голову",
      "Нет понимания реальной прибыли",
    ],
    solution: "Финансовый аудит + налоговая оптимизация под ваш бизнес",
    result: "Экономия 15–30% налоговой нагрузки в первые 3 месяца",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    tag: "Средний бизнес",
    tagColor: "#a855f7",
    title: "Бизнес растёт, но финансы не успевают за ростом?",
    pains: [
      "Решения принимаются «на ощупь», без цифр",
      "Cash flow непредсказуем — деньги есть, но их нет",
      "Инвесторы требуют отчётность, которой нет",
    ],
    solution: "CFO на аутсорсе + ML-дашборд для контроля в реальном времени",
    result: "Финансовая модель, понятные метрики и готовность к инвестициям",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    tag: "Крупный бизнес",
    tagColor: "#ec4899",
    title: "Много данных — но нет единой картины финансов?",
    pains: [
      "Отчёты готовятся неделями, решения нужны сейчас",
      "Валютные риски и compliance съедают прибыль",
      "ML и BI-системы есть, но не интегрированы",
    ],
    solution: "Интеграция ML-моделей + единый финансовый дашборд для C-level",
    result: "Контроль всех показателей в одном окне — в реальном времени",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// ─── Карточка сегмента ────────────────────────────────────────
function SegmentCard({
  segment,
  index,
}: {
  segment: (typeof segments)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col rounded-2xl overflow-hidden group"
      style={{
        background: "#0d0d1a",
        border: "1px solid rgba(99,102,241,0.1)",
      }}
    >
      {/* Верхняя цветная полоса */}
      <div className="h-[3px] w-full" style={{
        background: `linear-gradient(to right, ${segment.tagColor}, transparent)`
      }} />

      <div className="p-7 flex flex-col flex-1">
        {/* Иконка + тег */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${segment.tagColor}15`, color: segment.tagColor }}>
            {segment.icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: `${segment.tagColor}15`, color: segment.tagColor }}>
            {segment.tag}
          </span>
        </div>

        {/* Заголовок — боль */}
        <h3 className="text-[17px] font-bold text-white leading-snug mb-5"
          style={{ letterSpacing: "-0.01em" }}>
          {segment.title}
        </h3>

        {/* Список болей */}
        <div className="space-y-3 mb-6">
          {segment.pains.map((pain, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ background: segment.tagColor, opacity: 0.5 }} />
              <span className="text-[13px] text-slate-500 leading-relaxed">{pain}</span>
            </div>
          ))}
        </div>

        {/* Разделитель */}
        <div className="h-px mb-5" style={{ background: `${segment.tagColor}20` }} />

        {/* Решение */}
        <div className="mb-4">
          <div className="text-[9px] uppercase tracking-widest mb-2"
            style={{ color: segment.tagColor, opacity: 0.6 }}>
            Решение
          </div>
          <p className="text-[13px] text-slate-300 leading-relaxed font-medium">
            {segment.solution}
          </p>
        </div>

        {/* Результат */}
        <div className="mt-auto pt-4 rounded-xl px-4 py-3"
          style={{ background: `${segment.tagColor}08`, border: `1px solid ${segment.tagColor}20` }}>
          <div className="text-[9px] uppercase tracking-widest mb-1.5"
            style={{ color: segment.tagColor, opacity: 0.6 }}>
            Результат
          </div>
          <p className="text-[13px] font-semibold" style={{ color: segment.tagColor }}>
            {segment.result}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Главный компонент ────────────────────────────────────────
export default function PainSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="pain" className="relative py-24 overflow-hidden" style={{ background: "#080810" }}>
      {/* Фоновое свечение */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-10"
          style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Заголовок секции */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <span className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#818cf8" }}>
              Узнаёте себя?
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5"
            style={{ letterSpacing: "-0.03em" }}>
            Типичные проблемы{" "}
            <span style={{
              background: "linear-gradient(135deg, #818cf8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              вашего бизнеса
            </span>
          </h2>

          <p className="text-slate-500 text-[16px] max-w-xl mx-auto leading-relaxed">
            Каждый сегмент — своя боль. Я знаю решение для каждого.
          </p>
        </motion.div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {segments.map((segment, i) => (
            <SegmentCard key={segment.tag} segment={segment} index={i} />
          ))}
        </div>

        {/* CTA снизу */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-slate-600 text-[14px] mb-5">
            Не нашли свою ситуацию? Расскажите — найдём решение.
          </p>
          <a href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[13px] text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 30px rgba(99,102,241,0.25)",
            }}
          >
            Обсудить мою ситуацию
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
