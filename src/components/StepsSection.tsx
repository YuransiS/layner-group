"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";

export function StepsSection() {
  const { t } = useLanguage();

  return (
    <section id="steps" className="py-16 sm:py-24 bg-[#F4F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161D1C] tracking-tight">
            {t.steps.title}
          </h2>
        </div>

        {/* 3 Steps horizontal cards strictly from ТЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {t.steps.items.map((step, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-white border border-[#C9CFCC] shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-accent font-extrabold text-4xl sm:text-5xl text-[#237D73] tracking-tight block mb-4">
                  {step.num}
                </span>

                <h3 className="font-headline font-bold text-2xl text-[#161D1C] mb-3">
                  {step.title}
                </h3>

                <p className="font-body text-base text-[#161D1C]/75 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button strictly from ТЗ */}
        <div className="text-center mt-12">
          <a
            href="#apply"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-headline font-bold text-base bg-[#237D73] text-[#D9FF43] hover:bg-[#123D39] transition-all shadow-md active:scale-98"
          >
            <span>{t.steps.ctaButton}</span>
            <ArrowRight className="w-5 h-5 text-[#D9FF43]" />
          </a>
        </div>
      </div>
    </section>
  );
}
