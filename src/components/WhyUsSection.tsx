"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Coins,
  Gauge,
  CalendarCheck,
  Compass,
  CreditCard,
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
    <section id="why-us" className="py-16 sm:py-24 bg-[#D9E0DD]/30 border-y border-[#C9CFCC]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161D1C] tracking-tight">
            {t.whyUs.title}
          </h2>
        </div>

        {/* 5 Benefits Grid strictly from ТЗ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whyUs.items.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-2xl bg-white border border-[#C9CFCC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#123D39] flex items-center justify-center mb-5">
                  {icons[index % icons.length]}
                </div>

                <h3 className="font-headline font-bold text-xl text-[#161D1C] mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-[#161D1C]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
