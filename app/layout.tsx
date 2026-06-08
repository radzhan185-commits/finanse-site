import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Абди Галия — Финансовый советник | Казахстан",
  description:
    "Стратегический финансовый советник для МСБ и крупного бизнеса в Казахстане. Аудит, налоговая оптимизация, CFO аутсорс, ML-дашборды. Астана.",
  keywords:
    "финансовый советник Казахстан, налоговая оптимизация, финансовый аудит, CFO аутсорс, ML дашборд, Астана, Алматы",
  authors: [{ name: "Абди Галия" }],
  creator: "Абди Галия",
  metadataBase: new URL("https://finanse-site.vercel.app"),
  openGraph: {
    title: "Абди Галия — Финансовый советник",
    description:
      "Финансовый интеллект для вашего бизнеса. Аудит, налоги, ML-аналитика.",
    url: "https://finanse-site.vercel.app",
    siteName: "Абди Галия",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Абди Галия — Финансовый советник",
    description: "Финансовый интеллект для вашего бизнеса в Казахстане.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}