"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Truck, FileCheck, Building2, Timer, Check } from "lucide-react";

export function TargetAudience() {
  const { t } = useLanguage();

  const icons = [
    <Truck key="1" className="w-7 h-7 text-[#D9FF43]" />,
    <FileCheck key="2" className="w-7 h-7 text-[#D9FF43]" />,
    <Building2 key="3" className="w-7 h-7 text-[#D9FF43]" />,
    <Timer key="4" className="w-7 h-7 text-[#D9FF43]" />,
  ];

  return (
    <section id="target" className="py-16 sm:py-24 bg-[#123D39] text-white relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#237D73]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#D9FF43]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-accent uppercase font-bold text-xs tracking-widest text-[#D9FF43] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Критерии партнёрства
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {t.target.title}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#F4F3EE]/80 mt-3 max-w-2xl mx-auto">
            {t.target.note}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.target.items.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#237D73] flex items-center justify-center mb-6 shadow-inner">
                  {icons[idx]}
                </div>

                <h3 className="font-headline font-bold text-xl text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="font-body text-sm text-[#F4F3EE]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#D9FF43]">
                <Check className="w-4 h-4 text-[#D9FF43]" />
                <span>Обязательное условие</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#237D73]/30 border border-[#237D73]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🤝</span>
            <div>
              <h4 className="font-headline font-bold text-base text-white">
                Подходим друг другу?
              </h4>
              <p className="font-body text-xs text-[#F4F3EE]/80">
                Заполните форму, и мы согласуем ставки для ваших машин уже сегодня.
              </p>
            </div>
          </div>
          <a
            href="#apply"
            className="px-6 py-3 rounded-xl font-headline font-bold text-sm bg-[#D9FF43] text-[#123D39] hover:bg-white transition-colors shrink-0 shadow-sm"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  );
}
