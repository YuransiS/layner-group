"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Building, MapPin, Globe2, Euro } from "lucide-react";

export function AboutSection() {
  const { t } = useLanguage();

  const badgeIcons = [
    <Building key="1" className="w-4 h-4 text-[#237D73]" />,
    <MapPin key="2" className="w-4 h-4 text-[#237D73]" />,
    <Globe2 key="3" className="w-4 h-4 text-[#237D73]" />,
    <Euro key="4" className="w-4 h-4 text-[#237D73]" />,
  ];

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
                  alt="Layner Group Dispatch Center & Logistics Fleet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#123D39]/70 via-transparent to-transparent" />
              </div>

              {/* Bottom overlay info */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#C9CFCC] flex items-center justify-between">
                <div>
                  <span className="font-accent uppercase font-bold text-xs text-[#237D73] block">
                    Центр координации рейсов
                  </span>
                  <span className="font-headline font-bold text-sm text-[#161D1C]">
                    Диспетчеризация и круглосуточный мониторинг
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-accent font-bold text-lg text-[#123D39] block">
                    10 000+
                  </span>
                  <span className="text-[10px] text-[#161D1C]/60 uppercase tracking-wider">
                    Рейсов
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text and stats */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-accent uppercase font-bold text-xs tracking-widest text-[#237D73] bg-[#237D73]/10 px-3.5 py-1.5 rounded-full inline-block">
              Надёжный логистический партнёр
            </span>

            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161D1C] tracking-tight">
              {t.about.title}
            </h2>

            <p className="font-body text-base sm:text-lg text-[#161D1C]/85 leading-relaxed">
              {t.about.desc1}
            </p>

            <p className="font-body text-base sm:text-lg text-[#161D1C]/75 leading-relaxed">
              {t.about.desc2}
            </p>

            {/* Badges from ТЗ */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {t.about.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#C9CFCC] text-xs font-semibold text-[#123D39] shadow-2xs"
                >
                  {badgeIcons[idx % badgeIcons.length]}
                  <span>{tag}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#C9CFCC]">
              {t.about.stats.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-[#C9CFCC]/70">
                  <span className="font-accent font-bold text-2xl sm:text-3xl text-[#123D39] block">
                    {st.value}
                  </span>
                  <span className="text-xs text-[#161D1C]/70 block mt-0.5">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
