"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function TargetAudience() {
  const { t } = useLanguage();

  return (
    <section id="target" className="py-16 sm:py-24 bg-[#123D39] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {t.target.title}
          </h2>
        </div>

        {/* 4 Cards Grid strictly matching ТЗ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.target.items.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-5">
                  {item.icon}
                </div>

                <h3 className="font-headline font-bold text-xl text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Note strictly from ТЗ */}
        <div className="mt-10 text-center">
          <p className="font-body text-base sm:text-lg text-[#F4F3EE]/80 max-w-2xl mx-auto">
            {t.target.note}
          </p>
        </div>
      </div>
    </section>
  );
}
