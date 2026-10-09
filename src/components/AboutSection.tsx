"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F4F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image & Hub Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#C9CFCC] shadow-xl">
              <div className="relative aspect-16/10 w-full bg-[#123D39]">
                <Image
                  src="/images/fleet-hub.jpg"
                  alt="Layner Group Logistics Fleet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Text and badges strictly from ТЗ */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161D1C] tracking-tight">
              {t.about.title}
            </h2>

            <p className="font-body text-base sm:text-lg text-[#161D1C]/85 leading-relaxed">
              {t.about.desc1}
            </p>

            <p className="font-body text-base sm:text-lg text-[#161D1C]/75 leading-relaxed">
              {t.about.desc2}
            </p>

            {/* Badges strictly from ТЗ */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {t.about.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-[#C9CFCC] text-xs sm:text-sm font-semibold text-[#123D39] shadow-2xs"
                >
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
