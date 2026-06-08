// FILE: app/components/FAQSection.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Как проходит первая консультация?",
    a: "Первая консультация — 30 минут, бесплатно. Вы рассказываете о ситуации, я задаю вопросы и сразу говорю что можно улучшить. Без продаж и давления. Если увижу что не смогу помочь — честно скажу.",
  },
  {
    q: "Вы работаете только с компаниями в Казахстане?",
    a: "Основная экспертиза — законодательство РК, налоговый кодекс Казахстана, МФЦА. Работаю с компаниями зарегистрированными в РК. Дистанционно — с любым городом Казахстана.",
  },
  {
    q: "Что такое ML-дашборд и зачем он мне?",
    a: "Это система которая автоматически собирает ваши финансовые данные из 1С, Excel или Google Sheets и показывает в одном экране: выручку, расходы, прогноз на 3 месяца, риски кассового разрыва. Вы принимаете решения на основе цифр — а не интуиции.",
  },
  {
    q: "Сколько стоят услуги?",
    a: "Стоимость зависит от объёма задачи. Финансовый аудит — от 150 000 тенге. CFO на аутсорсе — от 200 000 тенге в месяц. ML-дашборд — от 300 000 тенге разово + подписка. Точную цену назову после первой консультации когда пойму масштаб.",
  },
  {
    q: "Как быстро будет результат?",
    a: "Первые находки при аудите — в течение 1–2 недель. Налоговая оптимизация даёт эффект через 1–3 месяца. ML-дашборд разворачивается за 4–8 недель. CFO на аутсорсе — вы чувствуете разницу уже в первый месяц.",
  },
  {
    q: "Вы подписываете NDA? Данные в безопасности?",
    a: "Да, всегда подписываю соглашение о конфиденциальности перед началом работы. Ваши финансовые данные не передаются третьим лицам. Работаю в соответствии с законом РК о персональных данных.",
  },
  {
    q: "Чем вы отличаетесь от обычного бухгалтера?",
    a: "Бухгалтер фиксирует прошлое — я работаю с будущим. Бухгалтер ведёт учёт — я строю стратегию. Плюс ML-аналитика которой нет ни у одного бухгалтера в РК. Мы с бухгалтером не конкуренты — я дополняю его работу стратегическим уровнем.",
  },
  {
    q: "Можно работать если у нас уже есть финдиректор?",
    a: "Да. Часто работаю вместе со штатным финдиректором как внешний эксперт: независимый аудит, ML-инструменты, стратегические задачи которые не успевает делать штатный CFO. Это усиливает команду, а не заменяет её.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onClick,
}: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? "rgba(99,102,241,0.06)" : "#0d0d1a",
        border: isOpen
          ? "1px solid rgba(99,102,241,0.25)"
          : "1px solid rgba(99,102,241,0.08)",
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-white pr-4 leading-snug">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
            border: isOpen ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={isOpen ? "#818cf8" : "#475569"}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="h-px mb-4" style={{ background: "rgba(99,102,241,0.15)" }} />
              <p className="text-[14px] text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="faq" className="relative py-24 overflow-hidden" style={{ background: "#080810" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">

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
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
              Частые вопросы
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}>
            Отвечаю{" "}
            <span style={{
              background: "linear-gradient(135deg, #818cf8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              честно
            </span>
          </h2>
          <p className="text-slate-600 text-[15px]">
            Всё что обычно спрашивают перед началом работы
          </p>
        </motion.div>

        {/* FAQ список */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14 rounded-2xl px-8 py-8"
          style={{
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <p className="text-white font-bold text-[18px] mb-2">Остался вопрос?</p>
          <p className="text-slate-600 text-[14px] mb-6">
            Напишите — отвечу в течение 2 часов в рабочее время
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[13px] text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 28px rgba(99,102,241,0.25)",
            }}
          >
            Задать вопрос
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
