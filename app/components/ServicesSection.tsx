// FILE: app/components/ServicesSection.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "audit",
    num: "01",
    tag: "Аудит",
    color: "#6366f1",
    title: "Финансовый аудит",
    short: "Найдём где теряются деньги",
    description:
      "Полный разбор финансового состояния компании: P&L, баланс, cash flow, налоговая нагрузка. Выявляем скрытые потери и точки роста.",
    features: [
      "Анализ P&L, баланса, cash flow",
      "Выявление налоговых переплат",
      "Сравнение с отраслевыми бенчмарками",
      "Письменный отчёт с рекомендациями",
    ],
    result: "Экономия 15–30% налоговой нагрузки",
    time: "2–4 недели",
  },
  {
    id: "tax",
    num: "02",
    tag: "Налоги",
    color: "#a855f7",
    title: "Налоговая оптимизация",
    short: "Платите меньше — законно",
    description:
      "Разрабатываем легальные схемы снижения налоговой нагрузки с учётом законодательства РК. Полное сопровождение при проверках.",
    features: [
      "Оптимизация НДС, КПН, ИПН",
      "Структурирование бизнеса",
      "Защита при налоговых проверках",
      "Работа с трансфертным ценообразованием",
    ],
    result: "Снижение налогов на 20–40%",
    time: "1–3 месяца",
  },
  {
    id: "cfo",
    num: "03",
    tag: "CFO аутсорс",
    color: "#ec4899",
    title: "CFO на аутсорсе",
    short: "Финдиректор без найма в штат",
    description:
      "Выполняю функции финансового директора: стратегия, бюджетирование, управление денежными потоками, отчётность для инвесторов.",
    features: [
      "Финансовая модель и бюджет",
      "Управление cash flow",
      "Investor deck и финотчётность",
      "Еженедельные встречи и поддержка",
    ],
    result: "Финансовая ясность без штата",
    time: "От 1 месяца",
  },
  {
    id: "invest",
    num: "04",
    tag: "Инвестиции",
    color: "#f59e0b",
    title: "Инвестиционная стратегия",
    short: "Куда вложить — и когда выйти",
    description:
      "Разработка инвестиционной стратегии для бизнеса и собственников: оценка активов, M&A, диверсификация портфеля в рамках законодательства РК.",
    features: [
      "Оценка инвестиционных проектов",
      "Due diligence и M&A поддержка",
      "Диверсификация портфеля",
      "Работа с альтернативными активами",
    ],
    result: "Доходность выше рынка на 15–25%",
    time: "Индивидуально",
  },
  {
    id: "ml",
    num: "05",
    tag: "ML-аналитика",
    color: "#22c55e",
    title: "ML-дашборды и аналитика",
    short: "Финансы под контролем 24/7",
    description:
      "Интеграция ML-моделей с вашими данными. Единый дашборд для C-level: прогнозы, аномалии, риски — в реальном времени. Уникальное решение на рынке РК.",
    features: [
      "Интеграция с 1С, SAP, Excel",
      "ML-прогноз выручки и расходов",
      "Детектор финансовых аномалий",
      "Real-time дашборд для руководства",
    ],
    result: "Решения на основе данных, не интуиции",
    time: "4–8 недель",
  },
  {
    id: "law",
    num: "06",
    tag: "Право РК",
    color: "#06b6d4",
    title: "Финансово-правовое сопровождение",
    short: "Защита в спорах и проверках",
    description:
      "Юридическая защита финансовых интересов бизнеса: налоговые споры, валютный контроль, compliance по законодательству Казахстана.",
    features: [
      "Налоговые споры и апелляции",
      "Валютный контроль и МФЦА",
      "Compliance и внутренний аудит",
      "Договорная работа",
    ],
    result: "Защита активов и минимизация рисков",
    time: "По запросу",
  },
];

// ─── Карточка услуги ──────────────────────────────────────────
function ServiceCard({
  service,
  index,
  isActive,
  onClick,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
      onClick={onClick}
      className="relative rounded-2xl cursor-pointer transition-all duration-300 group"
      style={{
        background: isActive ? `${service.color}10` : "#0d0d1a",
        border: isActive
          ? `1px solid ${service.color}40`
          : "1px solid rgba(99,102,241,0.1)",
        boxShadow: isActive ? `0 0 40px ${service.color}15` : "none",
      }}
    >
      {/* Верхняя полоса */}
      <div className="h-[2px] rounded-t-2xl transition-all duration-300"
        style={{
          background: isActive
            ? `linear-gradient(to right, ${service.color}, transparent)`
            : "transparent",
        }} />

      <div className="p-6">
        {/* Номер + тег */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-black font-mono"
            style={{ color: `${service.color}50` }}>
            {service.num}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: `${service.color}15`, color: service.color }}>
            {service.tag}
          </span>
        </div>

        {/* Заголовок */}
        <h3 className="text-[16px] font-bold text-white mb-1.5 leading-snug"
          style={{ letterSpacing: "-0.01em" }}>
          {service.title}
        </h3>
        <p className="text-[12px] mb-4" style={{ color: `${service.color}80` }}>
          {service.short}
        </p>

        {/* Раскрытый контент */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Фичи */}
              <div className="space-y-2 mb-5">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={service.color} strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[12px] text-slate-400">{f}</span>
                  </div>
                ))}
              </div>

              {/* Результат + срок */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl px-3 py-2.5"
                  style={{ background: `${service.color}08`, border: `1px solid ${service.color}20` }}>
                  <div className="text-[8px] uppercase tracking-widest mb-1"
                    style={{ color: `${service.color}60` }}>Результат</div>
                  <div className="text-[11px] font-semibold" style={{ color: service.color }}>
                    {service.result}
                  </div>
                </div>
                <div className="rounded-xl px-3 py-2.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-[8px] uppercase tracking-widest text-slate-700 mb-1">Срок</div>
                  <div className="text-[11px] font-semibold text-slate-400">{service.time}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Кнопка раскрытия */}
        <div className="flex items-center gap-1.5 mt-4"
          style={{ color: isActive ? service.color : "#818cf8" }}>
          <span className="text-[11px] font-semibold">
            {isActive ? "Свернуть" : "Подробнее"}
          </span>
          <motion.svg
            width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Главный компонент ────────────────────────────────────────
export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>("ml");
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="services" className="relative py-24 overflow-hidden" style={{ background: "#080810" }}>
      {/* Фон */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-8"
          style={{ background: "radial-gradient(ellipse, #a855f7 0%, transparent 70%)" }} />
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
                <span className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#818cf8" }}>
                  Что я делаю
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white"
                style={{ letterSpacing: "-0.03em" }}>
                Услуги{" "}
                <span style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  и решения
                </span>
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] max-w-sm leading-relaxed sm:text-right">
              Нажмите на карточку — увидите детали, результаты и сроки
            </p>
          </div>
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              isActive={activeId === s.id}
              onClick={() => setActiveId(activeId === s.id ? null : s.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <div>
            <p className="text-white font-bold text-[17px] mb-1">Не знаете с чего начать?</p>
            <p className="text-slate-600 text-[13px]">Бесплатная 30-минутная консультация — разберём вашу ситуацию</p>
          </div>
          <a href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[13px] text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 24px rgba(99,102,241,0.3)",
            }}
          >
            Бесплатная консультация
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
