// FILE: app/components/CasesSection.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const cases = [
  {
    id: "case1",
    tag: "Налоговая оптимизация",
    tagColor: "#6366f1",
    segment: "Средний бизнес · Алматы",
    title: "Производственная компания сэкономила ₸28M на налогах",
    problem: "Компания переплачивала НДС из-за неправильной структуры закупок. Бухгалтер не видел проблемы 3 года.",
    solution: "Аудит выявил ошибки в учёте входящего НДС. Реструктурировали закупочные договора и схему работы с поставщиками.",
    metrics: [
      { label: "Экономия в год", value: "₸28M", color: "#6366f1" },
      { label: "Срок работы", value: "6 нед.", color: "#a855f7" },
      { label: "ROI клиента", value: "×14", color: "#22c55e" },
    ],
    quote: "Думали что всё в порядке — оказалось переплачивали годами. Галия нашла это за две недели.",
    author: "Директор, производство",
  },
  {
    id: "case2",
    tag: "ML-дашборд",
    tagColor: "#22c55e",
    segment: "Крупный бизнес · Астана",
    title: "Торговая сеть получила прогноз cash flow с точностью 94%",
    problem: "Кассовые разрывы возникали внезапно. Финансисты не успевали реагировать — приходилось брать дорогие овердрафты.",
    solution: "Интегрировали ML-модель с данными из 1С. Дашборд показывает прогноз на 90 дней вперёд и алертит за 3 недели до разрыва.",
    metrics: [
      { label: "Точность прогноза", value: "94%", color: "#22c55e" },
      { label: "Экономия на овердрафтах", value: "₸15M", color: "#6366f1" },
      { label: "Горизонт прогноза", value: "90 дн.", color: "#a855f7" },
    ],
    quote: "Теперь я знаю за месяц что будет с деньгами. Это изменило как мы планируем бизнес.",
    author: "CFO, торговая сеть",
  },
  {
    id: "case3",
    tag: "CFO аутсорс",
    tagColor: "#a855f7",
    segment: "Малый бизнес · Алматы",
    title: "IT-стартап привлёк инвестиции после 3 месяцев работы",
    problem: "Стартап год не мог привлечь инвестора — не было нормальной финансовой модели и понятной отчётности.",
    solution: "Построили финансовую модель, unit-экономику, investor deck. Подготовили компанию к due diligence.",
    metrics: [
      { label: "Привлечено инвестиций", value: "₸120M", color: "#a855f7" },
      { label: "Срок подготовки", value: "3 мес.", color: "#6366f1" },
      { label: "Инвесторов на питче", value: "4", color: "#22c55e" },
    ],
    quote: "Без Галии мы бы ещё год искали инвестора. Она сделала нас понятными для денег.",
    author: "CEO, IT-стартап",
  },
  {
    id: "case4",
    tag: "Инвестиционная стратегия",
    tagColor: "#f59e0b",
    segment: "Собственник бизнеса · Астана",
    title: "Собственник диверсифицировал активы и защитил капитал",
    problem: "Всё состояние было в одном бизнесе. При валютных колебаниях терял 20–30% стоимости активов.",
    solution: "Разработали стратегию диверсификации: часть в казахстанские инструменты, часть в валютные активы через МФЦА.",
    metrics: [
      { label: "Активов под стратегией", value: "₸340M", color: "#f59e0b" },
      { label: "Защита от девальвации", value: "70%", color: "#22c55e" },
      { label: "Доходность портфеля", value: "+23%", color: "#6366f1" },
    ],
    quote: "Наконец-то сплю спокойно. Деньги работают — я не переживаю за курс тенге каждое утро.",
    author: "Собственник бизнеса",
  },
];

// ─── Карточка кейса ───────────────────────────────────────────
function CaseCard({
  item,
  index,
  isActive,
  onClick,
}: {
  item: (typeof cases)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onClick={onClick}
      className="relative rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background: isActive ? `${item.tagColor}08` : "#0d0d1a",
        border: isActive
          ? `1px solid ${item.tagColor}35`
          : "1px solid rgba(99,102,241,0.1)",
        boxShadow: isActive ? `0 0 50px ${item.tagColor}10` : "none",
      }}
    >
      {/* Цветная полоса */}
      <div className="h-[2px] rounded-t-2xl"
        style={{
          background: isActive
            ? `linear-gradient(to right, ${item.tagColor}, transparent)`
            : "transparent",
        }} />

      <div className="p-6">
        {/* Тег + сегмент */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: `${item.tagColor}15`, color: item.tagColor }}>
            {item.tag}
          </span>
          <span className="text-[10px] text-slate-700">{item.segment}</span>
        </div>

        {/* Заголовок */}
        <h3 className="text-[16px] font-bold text-white leading-snug mb-4"
          style={{ letterSpacing: "-0.01em" }}>
          {item.title}
        </h3>

        {/* Метрики — всегда видны */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {item.metrics.map((m, i) => (
            <div key={i} className="rounded-xl px-3 py-2.5 text-center"
              style={{ background: `${m.color}10`, border: `1px solid ${m.color}20` }}>
              <div className="text-[15px] font-black font-mono" style={{ color: m.color }}>
                {m.value}
              </div>
              <div className="text-[8px] text-slate-600 mt-0.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Раскрытый контент */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              {/* Проблема */}
              <div className="mb-4">
                <div className="text-[9px] uppercase tracking-widest text-slate-700 mb-2">Проблема</div>
                <p className="text-[13px] text-slate-500 leading-relaxed">{item.problem}</p>
              </div>

              {/* Решение */}
              <div className="mb-5">
                <div className="text-[9px] uppercase tracking-widest mb-2"
                  style={{ color: `${item.tagColor}60` }}>Решение</div>
                <p className="text-[13px] text-slate-400 leading-relaxed">{item.solution}</p>
              </div>

              {/* Цитата */}
              <div className="rounded-xl px-4 py-4"
                style={{ background: `${item.tagColor}08`, border: `1px solid ${item.tagColor}20` }}>
                <div className="text-[20px] mb-2" style={{ color: `${item.tagColor}40` }}>"</div>
                <p className="text-[13px] text-slate-300 leading-relaxed italic mb-3">
                  {item.quote}
                </p>
                <div className="text-[10px] font-semibold" style={{ color: item.tagColor }}>
                  — {item.author}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Кнопка */}
        <div className="flex items-center gap-1.5 mt-4"
          style={{ color: isActive ? item.tagColor : "#818cf8" }}>
          <span className="text-[11px] font-semibold">
            {isActive ? "Свернуть" : "Читать кейс"}
          </span>
          <motion.svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Главный компонент ────────────────────────────────────────
export default function CasesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  // Суммарные цифры
  const totals = [
    { value: "₸500M+", label: "сэкономлено и привлечено для клиентов" },
    { value: "47+", label: "закрытых кейсов" },
    { value: "94%", label: "клиентов возвращаются повторно" },
  ];

  return (
    <section id="cases" className="relative py-24 overflow-hidden" style={{ background: "#080810" }}>
      {/* Фон */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Заголовок */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
                  Реальные результаты
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white"
                style={{ letterSpacing: "-0.03em" }}>
                Кейсы{" "}
                <span style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  и цифры
                </span>
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] max-w-xs leading-relaxed sm:text-right">
              Нажмите на кейс — увидите проблему, решение и цитату клиента
            </p>
          </div>
        </motion.div>

        {/* Суммарные цифры */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-10 rounded-2xl p-6"
          style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.1)" }}
        >
          {totals.map((t, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1"
                style={{ letterSpacing: "-0.03em", color: i === 0 ? "#818cf8" : i === 1 ? "#a855f7" : "#22c55e" }}>
                {t.value}
              </div>
              <div className="text-[11px] text-slate-600 leading-tight">{t.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Карточки кейсов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cases.map((item, i) => (
            <CaseCard
              key={item.id}
              item={item}
              index={i}
              isActive={activeId === item.id}
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 text-[14px] mb-5">
            Хотите такой же результат? Начнём с бесплатного разбора вашей ситуации.
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[13px] text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 28px rgba(99,102,241,0.25)",
            }}
          >
            Хочу такой результат
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
