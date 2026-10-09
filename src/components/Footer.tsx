"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Truck, ShieldCheck, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#161D1C] text-[#F4F3EE] border-t border-[#C9CFCC]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#237D73] flex items-center justify-center text-[#D9FF43]">
                <Truck className="w-5 h-5" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight text-white">
                LAYNER <span className="text-[#237D73]">GROUP</span>
              </span>
            </div>

            <p className="font-body text-sm text-[#C9CFCC] max-w-md leading-relaxed">
              Ежедневные загрузки по Европе для владельцев тентованных машин. Фиксированная ставка за км, гарантированный километраж, оплата в евро без задержек.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D9FF43] font-accent uppercase tracking-wider font-bold pt-1">
              <ShieldCheck className="w-4 h-4 text-[#237D73]" />
              <span>Лицензированный европейский перевозчик</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm uppercase tracking-wider text-white">
              Навигация
            </h4>
            <ul className="space-y-2 text-sm text-[#C9CFCC]">
              <li>
                <a href="#why-us" className="hover:text-[#D9FF43] transition-colors">
                  {t.nav.whyUs}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D9FF43] transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#target" className="hover:text-[#D9FF43] transition-colors">
                  {t.nav.whoWeLookFor}
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#D9FF43] transition-colors">
                  {t.nav.howToStart}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D9FF43] transition-colors">
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contacts */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm uppercase tracking-wider text-white">
              География
            </h4>
            <div className="space-y-2 text-sm text-[#C9CFCC]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#237D73] shrink-0 mt-0.5" />
                <span>Польша · Варшава</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#237D73] shrink-0 mt-0.5" />
                <span>Франция · Париж</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#237D73] shrink-0 mt-0.5" />
                <span>support@laynergroup.eu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#C9CFCC]/70 gap-4">
          <p>© 2026 {t.footer.rights}</p>
          <p>{t.footer.location}</p>
          <p>{t.footer.privacy}</p>
        </div>
      </div>
    </footer>
  );
}
