"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/data/translations";
import { Truck, Menu, X, Globe, PhoneCall } from "lucide-react";

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "ru", label: "RU", flag: "🇷🇺" },
    { code: "bg", label: "BG", flag: "🇧🇬" },
    { code: "ro", label: "RO", flag: "🇷🇴" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F4F3EE]/95 backdrop-blur-md border-b border-[#C9CFCC]/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#123D39] flex items-center justify-center text-[#D9FF43] shadow-sm group-hover:bg-[#237D73] transition-colors">
              <Truck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-xl tracking-tight text-[#161D1C] flex items-center gap-1 leading-none">
                LAYNER <span className="text-[#237D73]">GROUP</span>
                <span className="w-2 h-2 rounded-full bg-[#D9FF43] inline-block animate-pulse"></span>
              </span>
              <span className="font-accent uppercase tracking-widest text-xs text-[#161D1C]/60 mt-1">
                European Freight
              </span>
            </div>
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

          {/* Right Controls: Language Switcher & Quick CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center bg-[#D9E0DD]/60 rounded-xl p-1 border border-[#C9CFCC]/60">
              <Globe className="w-4 h-4 ml-2 mr-1 text-[#123D39]" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                    lang === l.code
                      ? "bg-[#123D39] text-[#F4F3EE] shadow-xs"
                      : "text-[#161D1C]/70 hover:text-[#161D1C] hover:bg-white/40"
                  }`}
                  aria-label={`Switch language to ${l.label}`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-headline font-semibold text-sm bg-[#123D39] text-[#D9FF43] hover:bg-[#237D73] transition-all shadow-sm hover:shadow active:scale-98"
            >
              <span>{t.nav.ctaButton}</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="flex items-center bg-[#D9E0DD]/80 rounded-lg p-0.5 border border-[#C9CFCC]/60">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-1.5 py-1 text-[11px] font-bold rounded-md ${
                    lang === l.code
                      ? "bg-[#123D39] text-white"
                      : "text-[#161D1C]/70"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#D9E0DD] text-[#161D1C] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F4F3EE] border-b border-[#C9CFCC] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-base font-medium text-[#161D1C]">
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#D9E0DD]"
            >
              {t.nav.whyUs}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#D9E0DD]"
            >
              {t.nav.about}
            </a>
            <a
              href="#target"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#D9E0DD]"
            >
              {t.nav.whoWeLookFor}
            </a>
            <a
              href="#steps"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#D9E0DD]"
            >
              {t.nav.howToStart}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#D9E0DD]"
            >
              {t.nav.faq}
            </a>
          </nav>

          <a
            href="#apply"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center block py-3 rounded-xl font-headline font-semibold text-base bg-[#123D39] text-[#D9FF43]"
          >
            {t.nav.ctaButton}
          </a>
        </div>
      )}
    </header>
  );
}
