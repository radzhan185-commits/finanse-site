// FILE: app/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "#cases" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  // Фон навбара при скролле
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Активная секция при скролле
  useEffect(() => {
    const ids = ["hero", "pain", "services", "cases", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Плавный скролл к секции
  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8,8,16,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(99,102,241,0.1)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Лого */}
        <button onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-[13px]"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
            АГ
          </div>
          <span className="font-bold text-[15px] text-white tracking-tight">
            Абди Галия
          </span>
        </button>

        {/* Десктоп меню */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl"
  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200"
              style={{
                color: active === link.href.replace("#", "")
  ? "#a78bfa"
  : "#94a3b8",
                background: active === link.href.replace("#", "")
                  ? "rgba(99,102,241,0.1)"
                  : "transparent",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA + бургер */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
            }}
          >
            Консультация
          </button>

          {/* Бургер для мобильных */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: "#818cf8" }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: "#818cf8" }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: "#818cf8" }}
            />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(8,8,16,0.97)",
              borderTop: "1px solid rgba(99,102,241,0.1)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-[14px] font-semibold transition-all"
                  style={{ color: "#818cf8", background: "rgba(99,102,241,0.06)" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#faq")}
                className="mt-2 px-4 py-3 rounded-xl font-bold text-[14px] text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
              >
                Получить консультацию
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
