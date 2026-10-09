"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#D9E0DD]/30 border-t border-[#C9CFCC]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123D39]/10 border border-[#123D39]/20 text-[#123D39] text-xs font-accent tracking-wider font-bold mb-3">
            <HelpCircle className="w-4 h-4 text-[#237D73]" />
            <span>ОТВЕТЫ НА ВОПРОСЫ</span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161D1C] tracking-tight">
            {t.faq.title}
          </h2>
          <p className="font-body text-base text-[#161D1C]/70 mt-3">
            Всё, что важно знать перед началом сотрудничества
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#C9CFCC] overflow-hidden transition-all shadow-2xs hover:border-[#237D73]/60"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-headline font-semibold text-lg sm:text-xl text-[#161D1C]">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#237D73] text-[#D9FF43] rotate-180"
                        : "bg-[#F4F3EE] text-[#161D1C]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-[#161D1C]/80 font-body text-base leading-relaxed border-t border-[#F4F3EE]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
