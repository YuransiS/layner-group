"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, CheckCheck } from "lucide-react";

export function StepsSection() {
  const { t } = useLanguage();

  return (
    <section id="steps" className="py-16 sm:py-24 bg-[#F4F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-accent uppercase font-bold text-xs tracking-widest text-[#237D73] bg-[#237D73]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Простой и быстрый старт
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161D1C] tracking-tight">
            {t.steps.title}
          </h2>
          <p className="font-body text-base text-[#161D1C]/70 mt-3">
            От заявки до первого рейса всего 3 прозрачных шага
          </p>
        </div>

        {/* 3 Steps horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {t.steps.items.map((step, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-white border border-[#C9CFCC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-accent font-extrabold text-4xl sm:text-5xl text-[#237D73]/30 tracking-tight">
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#123D39] text-[#D9FF43] flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                </div>

                <h3 className="font-headline font-bold text-2xl text-[#161D1C] mb-3">
                  {step.title}
                </h3>

                <p className="font-body text-base text-[#161D1C]/75 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#C9CFCC]/40 flex items-center gap-2 text-xs font-semibold text-[#123D39]">
                <CheckCheck className="w-4 h-4 text-[#237D73]" />
                <span>Быстрое согласование</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button below steps */}
        <div className="text-center mt-12">
          <a
            href="#apply"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-headline font-bold text-base bg-[#237D73] text-[#D9FF43] hover:bg-[#123D39] transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <span>{t.steps.ctaButton}</span>
            <ArrowRight className="w-5 h-5 text-[#D9FF43]" />
          </a>
        </div>
      </div>
    </section>
  );
}
