"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#161D1C] text-[#F4F3EE] border-t border-[#C9CFCC]/20 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo text only */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-headline font-bold text-2xl tracking-tight text-white">
              LAYNER <span className="text-[#237D73]">GROUP</span>
            </span>
            <p className="font-body text-xs sm:text-sm text-[#C9CFCC] mt-2 max-w-md text-center md:text-left">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#C9CFCC]">
            <a href="#why-us" className="hover:text-[#D9FF43] transition-colors">
              {t.nav.whyUs}
            </a>
            <a href="#about" className="hover:text-[#D9FF43] transition-colors">
              {t.nav.about}
            </a>
            <a href="#target" className="hover:text-[#D9FF43] transition-colors">
              {t.nav.whoWeLookFor}
            </a>
            <a href="#steps" className="hover:text-[#D9FF43] transition-colors">
              {t.nav.howToStart}
            </a>
            <a href="#faq" className="hover:text-[#D9FF43] transition-colors">
              {t.nav.faq}
            </a>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#C9CFCC]/70 gap-3 text-center sm:text-left">
          <p>© 2026 {t.footer.rights}</p>
          <p>{t.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
