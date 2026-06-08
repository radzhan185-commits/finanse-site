// ============================================================
// FILE: app/components/HeroSection.tsx
// СТЕК: Next.js App Router · TypeScript · Tailwind · Framer Motion
//
// УСТАНОВИ зависимости перед вставкой:
//   npm install framer-motion clsx
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

// ─── Типы ────────────────────────────────────────────────────
interface BeamProps {
  x: number;
  y: number;
  angle: number;
  delay: number;
  duration: number;
  opacity: number;
  width: number;
}

// ─── Хук: позиция мыши для параллакс-эффекта ────────────────
function useMouseParallax(strength = 20) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(((e.clientX - cx) / cx) * strength);
      mouseY.set(((e.clientY - cy) / cy) * strength);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY, strength]);

  return { smoothX, smoothY };
}

// ─── Анимированный счётчик ───────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

// ─── Beam-фон (движущиеся световые лучи) ────────────────────
function BeamBackground() {
  const beams: BeamProps[] = [
    { x: 15,  y: -10, angle: 35,  delay: 0,    duration: 8,  opacity: 0.07, width: 1 },
    { x: 30,  y: -5,  angle: 42,  delay: 1.5,  duration: 10, opacity: 0.05, width: 0.5 },
    { x: 50,  y: -8,  angle: 30,  delay: 0.8,  duration: 7,  opacity: 0.09, width: 1.5 },
    { x: 65,  y: -12, angle: 38,  delay: 2.2,  duration: 9,  opacity: 0.06, width: 1 },
    { x: 78,  y: -6,  angle: 45,  delay: 0.3,  duration: 11, opacity: 0.08, width: 0.5 },
    { x: 88,  y: -10, angle: 33,  delay: 1.8,  duration: 8,  opacity: 0.05, width: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Радиальное свечение из центра */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Лучи */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {beams.map((beam, i) => (
          <motion.line
            key={i}
            x1={`${beam.x}%`}
            y1="-20%"
            x2={`${beam.x + Math.sin((beam.angle * Math.PI) / 180) * 60}%`}
            y2="120%"
            stroke="url(#beam-grad)"
            strokeWidth={beam.width}
            strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: beam.opacity, pathLength: 1 }}
            transition={{
              opacity: { delay: beam.delay, duration: 1.5 },
              pathLength: { delay: beam.delay, duration: beam.duration, ease: "easeInOut" },
            }}
          />
        ))}
      </svg>
      {/* Сетка (тонкая) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

// ─── Бейдж «ML-аналитика» ───────────────────────────────────
function MLBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase
                 border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 mb-8 select-none"
    >
      {/* Пульсирующая точка */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      Финансовый советник · Казахстан · ML-аналитика
    </motion.div>
  );
}

// ─── Карточка-метрика ────────────────────────────────────────
function MetricCard({
  value,
  suffix,
  prefix,
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center sm:items-start gap-1 px-6 py-4
                 rounded-xl border border-white/[0.06] bg-white/[0.03]
                 backdrop-blur-sm hover:border-emerald-500/20 transition-colors duration-300"
    >
      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
        <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
      </span>
      <span className="text-xs text-slate-400 font-medium leading-tight text-center sm:text-left">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Тег услуги ─────────────────────────────────────────────
function ServiceTag({
  icon,
  label,
  delay,
}: {
  icon: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                 bg-slate-800/60 text-slate-300 border border-white/[0.06]
                 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-200 cursor-default"
    >
      <span className="text-emerald-400 text-sm">{icon}</span>
      {label}
    </motion.span>
  );
}

// ─── ML Dashboard Визуализация ───────────────────────────────
function MLDashboardPreview() {
  // Имитация данных графика
  const bars = [42, 68, 55, 81, 73, 90, 78, 95, 82, 87, 93, 100];
  const months = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto lg:mx-0"
      aria-hidden="true"
    >
      {/* Внешнее свечение */}
      <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl" />

      {/* Карточка дашборда */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Заголовок дашборда */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-slate-300">Financial Intelligence Dashboard</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
        </div>

        {/* KPI-строка */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.04] border-b border-white/[0.06]">
          {[
            { label: "Выручка", value: "₸ 284M", delta: "+12.4%" },
            { label: "EBITDA", value: "38.2%", delta: "+3.1%" },
            { label: "ROI", value: "x2.7", delta: "+0.4" },
          ].map((kpi) => (
            <div key={kpi.label} className="px-4 py-3 bg-slate-900/60">
              <div className="text-[10px] text-slate-500 mb-1">{kpi.label}</div>
              <div className="text-sm font-bold text-white font-mono">{kpi.value}</div>
              <div className="text-[10px] text-emerald-400 font-medium">{kpi.delta}</div>
            </div>
          ))}
        </div>

        {/* График */}
        <div className="px-5 py-4">
          <div className="flex items-end justify-between gap-1 h-24">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center gap-0.5"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.1 + i * 0.04, duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "bottom" }}
              >
                <div
                  className="w-full rounded-t-[3px] transition-all"
                  style={{
                    height: `${h}%`,
                    background: h === 100
                      ? "linear-gradient(to top, #059669, #34d399)"
                      : h > 80
                      ? "rgba(16,185,129,0.6)"
                      : "rgba(16,185,129,0.25)",
                  }}
                />
              </motion.div>
            ))}
          </div>
          {/* Подписи месяцев */}
          <div className="flex justify-between mt-2 px-0.5">
            {months.map((m) => (
              <span key={m} className="text-[8px] text-slate-600">{m}</span>
            ))}
          </div>
        </div>

        {/* ML-инсайт */}
        <div className="mx-4 mb-4 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">ML-прогноз</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Модель прогнозирует рост EBITDA до <strong className="text-emerald-400">41%</strong> в Q1 при оптимизации налоговой нагрузки
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Главный компонент Hero ──────────────────────────────────
export default function HeroSection() {
  const { smoothX, smoothY } = useMouseParallax(15);

  // ✅ Выносим useTransform на верхний уровень компонента (правило хуков)
  const parallaxX = useTransform(smoothX, (v) => v * 0.5);
  const parallaxY = useTransform(smoothY, (v) => v * 0.5);

  const services = [
    { icon: "📊", label: "Финансовый аудит" },
    { icon: "🏦", label: "Налоговая оптимизация" },
    { icon: "📈", label: "Инвестиционная стратегия" },
    { icon: "🤖", label: "ML-дашборды" },
    { icon: "⚖️", label: "Финансовое право РК" },
    { icon: "🔄", label: "CFO на аутсорсе" },
  ];

  const metrics = [
    { value: 120, suffix: "+", label: "клиентов от МСБ до крупного бизнеса", delay: 0.7 },
    { value: 8,   suffix: " лет", label: "экспертизы на рынке Казахстана", delay: 0.85 },
    { value: 2400000000, prefix: "₸", label: "активов под управлением и советничеством", delay: 1.0 },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080c14]"
      aria-label="Главная секция"
    >
      {/* ── Фон ── */}
      <BeamBackground />

      {/* ── Основной контент ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Левая колонка: текст ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Бейдж */}
            <MLBadge />

            {/* Имя */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-sm font-semibold tracking-[0.25em] uppercase text-emerald-500 mb-3"
            >
              Абди Галия
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
              className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Финансовая{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  ясность
                </span>
                {/* Подчёркивание */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500/60 to-teal-400/60 rounded-full"
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <br />
              для вашего бизнеса
            </motion.h1>

            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              Стратегический советник для малого, среднего и крупного бизнеса в Казахстане.
              Аудит, налоги, инвестиции — плюс{" "}
              <span className="text-emerald-400 font-medium">
                ML-дашборды для контроля финансов в реальном времени.
              </span>
            </motion.p>

            {/* Теги услуг */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start"
            >
              {services.map((s, i) => (
                <ServiceTag key={s.label} icon={s.icon} label={s.label} delay={0.7 + i * 0.07} />
              ))}
            </motion.div>

            {/* CTA кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 mb-16 w-full sm:w-auto"
            >
              {/* Первичная CTA */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4
                           rounded-xl font-semibold text-sm text-white overflow-hidden
                           bg-emerald-600 hover:bg-emerald-500 transition-colors duration-200
                           shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
              >
                <span>Получить консультацию</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Вторичная CTA */}
              <Link
                href="/cases"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           rounded-xl font-semibold text-sm text-slate-300
                           border border-white/[0.1] hover:border-white/[0.2] hover:text-white
                           bg-white/[0.03] hover:bg-white/[0.06]
                           backdrop-blur-sm transition-all duration-200"
              >
                Смотреть кейсы
              </Link>
            </motion.div>

            {/* Метрики */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
            >
              {metrics.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </motion.div>
          </div>

          {/* ── Правая колонка: ML-дашборд ── */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="hidden lg:flex items-center justify-center"
          >
            <MLDashboardPreview />
          </motion.div>
        </div>
      </div>

      {/* ── Скролл-индикатор ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600">Прокрути вниз</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/[0.12] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-emerald-500/60" />
        </motion.div>
      </motion.div>

      {/* ── Дисклеймер (юр. требование) ── */}
      <div className="absolute bottom-4 right-4 text-[10px] text-slate-700 max-w-xs text-right" role="note">
        * Материалы носят информационный характер и не являются индивидуальной инвестиционной рекомендацией
      </div>
    </section>
  );
}
