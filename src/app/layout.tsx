import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://layner-group.vercel.app"),
  title: "Layner Group — Партнёрство для владельцев тентованных машин в Европе",
  description:
    "Ежедневные загрузки по Европе для владельцев тентованных машин. Фиксированная ставка за км + гарантированный километраж каждый месяц. Оплата в евро.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Layner Group — Партнёрство по грузоперевозкам в Европе",
    description:
      "Фиксированная ставка за км, гарантированный километраж, работа по всей Европе.",
    images: ["/images/hero-truck.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="min-h-screen bg-[#F4F3EE] text-[#161D1C] flex flex-col selection:bg-[#237D73] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
