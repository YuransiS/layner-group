"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Coins,
  Gauge,
  CalendarCheck,
  Compass,
  CreditCard,
  CheckCircle,
} from "lucide-react";

export function WhyUsSection() {
  const { t } = useLanguage();

  const icons = [
    <Coins key="1" className="w-6 h-6 text-[#D9FF43]" />,
    <Gauge key="2" className="w-6 h-6 text-[#D9FF43]" />,
    <CalendarCheck key="3" className="w-6 h-6 text-[#D9FF43]" />,
    <Compass key="4" className="w-6 h-6 text-[#D9FF43]" />,
    <CreditCard key="5" className="w-6 h-6 text-[#D9FF43]" />,
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#D9E0DD]/40 border-y border-[#C9CFCC]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-accent uppercase font-bold text-xs tracking-widest text-[#237D73] bg-[#237D73]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Преимущества сотрудничества
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161D1C] tracking-tight">
            {t.whyUs.title}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#161D1C]/70 mt-3">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* 5 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whyUs.items.map((item, index) => (
            <div
              key={index}
              className={`p-7 rounded-2xl bg-white border border-[#C9CFCC] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between ${
                index === 0
                  ? "lg:col-span-1 border-t-4 border-t-[#237D73]"
                  : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#123D39] flex items-center justify-center group-hover:bg-[#237D73] transition-colors shadow-xs">
                    {icons[index % icons.length]}
                  </div>
                  <span className="font-accent font-bold text-xs uppercase px-2.5 py-1 rounded-md bg-[#F4F3EE] text-[#123D39] border border-[#C9CFCC]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-xl text-[#161D1C] group-hover:text-[#237D73] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-[#161D1C]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#C9CFCC]/40 flex items-center gap-2 text-xs font-semibold text-[#237D73]">
                <CheckCircle className="w-4 h-4 text-[#237D73]" />
                <span>Гарантия по договору</span>
              </div>
            </div>
          ))}

          {/* 6th Highlight Promo Card */}
          <div className="p-7 rounded-2xl bg-[#123D39] text-white border border-[#123D39] shadow-md flex flex-col justify-between">
            <div>
              <span className="font-accent uppercase font-bold text-xs tracking-wider text-[#D9FF43] block mb-2">
                Специальные условия
              </span>
              <h3 className="font-headline font-bold text-2xl text-white mb-3">
                Работа без простоя
              </h3>
              <p className="font-body text-sm text-[#F4F3EE]/80 leading-relaxed">
                Пока одна машина на выгрузке, наши логисты уже согласовывают следующую загрузку. Ваш транспорт всегда в движении.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="#apply"
                className="inline-flex items-center justify-center w-full py-3 rounded-xl font-headline font-semibold text-sm bg-[#D9FF43] text-[#123D39] hover:bg-white transition-colors"
              >
                Подключить транспорт
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
