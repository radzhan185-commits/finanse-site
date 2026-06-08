// FILE: app/components/HeroSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

// ─── Параллакс мышью ─────────────────────────────────────────
function useMouseParallax(strength = 12) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 180 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 180 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouseX.set(((e.clientX - window.innerWidth / 2) / window.innerWidth) * strength);
      mouseY.set(((e.clientY - window.innerHeight / 2) / window.innerHeight) * strength);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mouseX, mouseY, strength]);
  return { smoothX, smoothY };
}

// ─── Счётчик ─────────────────────────────────────────────────
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1600, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ─── Фон: сетка + свечение ────────────────────────────────────
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Большое фиолетовое свечение слева */}
      <div className="absolute -left-40 top-0 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
      {/* Фиолетово-розовое справа снизу */}
      <div className="absolute -right-20 bottom-0 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
      {/* Тонкая сетка */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)",
        backgroundSize: "64px 64px"
      }} />
      {/* Вертикальный акцент слева */}
      <div className="absolute left-0 top-0 bottom-0 w-[5px]"
        style={{ background: "linear-gradient(to bottom, #6366f1, #a855f7, transparent)" }} />
    </div>
  );
}

// ─── Дашборд: ML Performance ──────────────────────────────────
function MLDashboard() {
  const bars = [42, 58, 51, 73, 65, 80, 70, 88, 76, 91, 95, 100];
  const months = ["Я","Ф","М","А","М","И","И","А","С","О","Н","Д"];

  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.15)]"
      style={{ background: "#0d0d1a", border: "1px solid rgba(99,102,241,0.2)" }}>

      {/* Шапка */}
      <div className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#a855f7" }} />
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
            Financial Intelligence
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(234,179,8,0.6)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.6)" }} />
        </div>
      </div>

      {/* KPI строка */}
      <div className="grid grid-cols-3" style={{ borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
        {[
          { name: "EBITDA", val: "38.2%", delta: "+3.1%", color: "#a855f7" },
          { name: "ROI", val: "×2.7", delta: "+0.4", color: "#6366f1" },
          { name: "Экономия", val: "₸4.2M", delta: "ML", color: "#8b5cf6" },
        ].map((k, i) => (
          <div key={i} className="px-4 py-3" style={{ borderRight: i < 2 ? "1px solid rgba(99,102,241,0.08)" : "none" }}>
            <div className="text-[9px] text-slate-600 mb-1 uppercase tracking-widest">{k.name}</div>
            <div className="text-[15px] font-bold text-white font-mono">{k.val}</div>
            <div className="text-[10px] font-bold mt-0.5" style={{ color: k.color }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* График */}
      <div className="px-5 pt-4 pb-2">
        <div className="text-[9px] uppercase tracking-widest mb-3" style={{ color: "rgba(139,92,246,0.5)" }}>
          Финансовый результат · 2024
        </div>
        <div className="flex items-end gap-1 h-20">
          {bars.map((h, i) => (
            <motion.div key={i}
              style={{
                flex: 1,
                alignSelf: "flex-end",
                borderRadius: "3px 3px 0 0",
                background: h === 100
                  ? "linear-gradient(to top, #6366f1, #a855f7)"
                  : h > 80
                  ? "rgba(139,92,246,0.6)"
                  : "rgba(99,102,241,0.2)",
              }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.8 + i * 0.04, duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {months.map((m, i) => (
            <span key={i} className="flex-1 text-center text-[8px]" style={{ color: "rgba(99,102,241,0.3)" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* ML Insight */}
      <div className="mx-4 mb-4 mt-1 px-4 py-3 rounded-xl"
        style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <div className="flex items-center gap-2 mb-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#a855f7">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#a855f7" }}>ML-прогноз</span>
          <span className="ml-auto text-[8px] px-2 py-0.5 rounded-full font-bold"
            style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}>94% accuracy</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Рост EBITDA до <strong style={{ color: "#a855f7" }}>41%</strong> при оптимизации налоговой нагрузки в Q1
        </p>
      </div>
    </div>
  );
}

// ─── Floating: Risk Monitor ───────────────────────────────────
function RiskCard() {
  const items = [
    { label: "Ликвидность", val: 82, color: "#22c55e" },
    { label: "Долг. нагрузка", val: 34, color: "#f59e0b" },
    { label: "Валютный риск", val: 21, color: "#6366f1" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.5, duration: 0.7, ease: "easeOut" }}
      className="absolute -bottom-8 -left-12 w-52 rounded-xl p-4 z-20"
      style={{ background: "#0d0d1a", border: "1px solid rgba(99,102,241,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#f59e0b" }} />
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Risk Monitor</span>
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1">
              <span className="text-[9px] text-slate-600">{item.label}</span>
              <span className="text-[9px] font-bold font-mono" style={{ color: item.color }}>{item.val}%</span>
            </div>
            <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
              <motion.div className="h-1 rounded-full"
                style={{ background: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.val}%` }}
                transition={{ delay: 1.7, duration: 0.9, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Floating: Live Signal ────────────────────────────────────
function SignalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.7, duration: 0.7, ease: "easeOut" }}
      className="absolute -top-8 -right-8 w-50 rounded-xl p-3.5 z-20"
      style={{ background: "#0d0d1a", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ background: "#a855f7" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#a855f7" }} />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#a855f7" }}>Live Signal</span>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
        Налоговая экономия:{" "}
        <strong style={{ color: "#a855f7" }}>₸4.2M</strong>
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="h-1 rounded-full w-[94%]" style={{ background: "linear-gradient(to right,#6366f1,#a855f7)" }} />
        </div>
        <span className="text-[9px] font-mono text-slate-600">94%</span>
      </div>
    </motion.div>
  );
}

// ─── Главный компонент ────────────────────────────────────────
export default function HeroSection() {
  const { smoothX, smoothY } = useMouseParallax(12);
  const px = useTransform(smoothX, (v: number) => v * 0.35);
  const py = useTransform(smoothY, (v: number) => v * 0.35);

  const tags = [
    "ML-дашборды",
    "Финансовый аудит",
    "Налоговая оптимизация",
    "Инвестиционная стратегия",
    "Финансовое право РК",
    "CFO аутсорс",
  ];

  const stats = [
    { to: 120, suffix: "+", label: "клиентов" },
    { to: 8, suffix: " лет", label: "на рынке РК" },
    { to: 94, suffix: "%", label: "ML accuracy" },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
  style={{ background: "#080810" }}>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* ── ЛЕВАЯ КОЛОНКА ── */}
          <div className="flex flex-col">

            {/* Бейдж */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 w-fit mb-6 px-4 py-2 rounded-full"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                  style={{ background: "#a855f7" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#a855f7" }} />
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#818cf8" }}>
                Финансовый советник · Казахстан
              </span>
            </motion.div>

            {/* Имя */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.35em] uppercase mb-3"
              style={{ color: "#6366f1" }}
            >
              Абди Галия
            </motion.p>

            {/* Заголовок */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
            >
              {/* Большое фоновое число */}
              <div className="relative">
                <div className="absolute -top-8 -left-4 text-[130px] font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(99,102,241,0.05)", fontFamily: "monospace", letterSpacing: "-0.05em" }}>
                  120
                </div>
                <h1 className="relative text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-5"
                  style={{ letterSpacing: "-0.03em" }}>
                  Финансы.{" "}
                  <span className="relative inline-block" style={{
                    background: "linear-gradient(135deg, #818cf8, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    Умнее.
                  </span>
                  <br />
                  Быстрее.
                </h1>
              </div>
            </motion.div>

            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-[15px] leading-relaxed max-w-lg mb-7 text-slate-400"
            >
              Стратегический советник для МСБ и крупного бизнеса в Казахстане.
              Аудит, налоги, инвестиции —{" "}
              <span className="font-semibold" style={{ color: "#a855f7" }}>
                и ML-дашборды для контроля финансов в реальном времени.
              </span>
            </motion.p>

            {/* Теги */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-9"
            >
              {tags.map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-default transition-all duration-200"
                  style={{
                    background: i === 0
                      ? "rgba(99,102,241,0.15)"
                      : "rgba(255,255,255,0.03)",
                    color: i === 0 ? "#818cf8" : "#475569",
                    border: i === 0
                      ? "1px solid rgba(99,102,241,0.3)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-[13px] text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.35)",
                }}
              >
                Получить консультацию
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/cases"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-[13px] transition-all duration-200"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  color: "#818cf8",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                Смотреть кейсы
              </Link>
            </motion.div>

            {/* Статистика */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex gap-10 pt-6"
              style={{ borderTop: "1px solid rgba(99,102,241,0.1)" }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white font-mono tracking-tight"
                    style={{ letterSpacing: "-0.03em" }}>
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: "rgba(99,102,241,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── ПРАВАЯ КОЛОНКА ── */}
          <motion.div
            style={{ x: px, y: py }}
            className="hidden lg:block relative"
          >
            {/* Свечение за дашбордом */}
            <div className="absolute -inset-8 rounded-3xl opacity-20"
              style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)" }} />

            {/* Floating карточки */}
            <SignalCard />

            {/* Основной дашборд */}
            <div className="relative z-10 mt-10 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              >
                <MLDashboard />
              </motion.div>
            </div>

            <RiskCard />
          </motion.div>
        </div>
      </div>

      {/* Скролл индикатор */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[8px] tracking-[0.25em] uppercase" style={{ color: "rgba(99,102,241,0.3)" }}>
          Прокрути вниз
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <div className="w-0.5 h-1.5 rounded-full" style={{ background: "rgba(99,102,241,0.5)" }} />
        </motion.div>
      </motion.div>

      {/* Дисклеймер */}
      <div className="absolute bottom-4 right-5 text-[9px] text-right max-w-[220px]"
        style={{ color: "rgba(99,102,241,0.2)" }} role="note">
        * Не является индивидуальной инвестиционной рекомендацией
      </div>
    </section>
  );
}
