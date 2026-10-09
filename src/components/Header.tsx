"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/data/translations";
import { Globe, ChevronDown } from "lucide-react";

interface HeaderProps {
  onOpenModal?: () => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();

  const languages: { code: Language; label: string; full: string }[] = [
    { code: "ru", label: "RU", full: "🇷🇺 Русский" },
    { code: "bg", label: "BG", full: "🇧🇬 Български" },
    { code: "ro", label: "RO", full: "🇷🇴 Română" },
  ];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.innerWidth < 1024 && onOpenModal) {
      onOpenModal();
    } else {
      const el = document.getElementById("apply");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F3EE]/95 backdrop-blur-md border-b border-[#C9CFCC]/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo text only */}
          <a href="#" className="flex items-center">
            <span className="font-headline font-bold text-2xl sm:text-3xl tracking-tight text-[#161D1C]">
              LAYNER <span className="text-[#237D73]">GROUP</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#161D1C]/80">
            <a
              href="#why-us"
              className="hover:text-[#237D73] transition-colors hover:underline decoration-[#237D73] underline-offset-4"
            >
              {t.nav.whyUs}
            </a>
            <a
              href="#about"
              className="hover:text-[#237D73] transition-colors hover:underline decoration-[#237D73] underline-offset-4"
            >
              {t.nav.about}
            </a>
            <a
              href="#target"
              className="hover:text-[#237D73] transition-colors hover:underline decoration-[#237D73] underline-offset-4"
            >
              {t.nav.whoWeLookFor}
            </a>
            <a
              href="#steps"
              className="hover:text-[#237D73] transition-colors hover:underline decoration-[#237D73] underline-offset-4"
            >
              {t.nav.howToStart}
            </a>
            <a
              href="#faq"
              className="hover:text-[#237D73] transition-colors hover:underline decoration-[#237D73] underline-offset-4"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* Right Controls: Touch-Friendly Language Select & CTA */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-white border border-[#C9CFCC] rounded-xl shadow-2xs hover:border-[#237D73] transition-colors">
              <Globe className="w-4 h-4 text-[#237D73] ml-3 pointer-events-none shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="appearance-none bg-transparent pl-2.5 pr-8 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#161D1C] focus:outline-none cursor-pointer"
                aria-label="Select language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="py-2 text-sm">
                    {l.full}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#161D1C]/60 absolute right-2.5 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={handleCtaClick}
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl font-headline font-semibold text-sm bg-[#123D39] text-[#D9FF43] hover:bg-[#237D73] transition-all shadow-sm cursor-pointer"
            >
              <span>{t.nav.ctaButton}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
