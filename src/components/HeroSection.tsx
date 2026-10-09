"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // На мобильных устройствах (< 1024px) открываем модальное окно
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onOpenModal();
    } else {
      // На десктопе плавно скроллим к единой нижней форме
      const el = document.getElementById("apply");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[calc(100svh-5rem)] flex flex-col justify-between lg:justify-center lg:min-h-0 lg:py-24">
      {/* 9:16 Фоновое изображение для мобильной версии на весь экран */}
      <div className="lg:hidden absolute inset-0 z-0">
        <Image
          src="/images/hero-truck-mobile.jpg"
          alt="Layner Group curtain-side truck"
          fill
          priority
          className="object-cover object-[center_65%]"
          sizes="100vw"
        />
        {/* Прозрачный градиент: затемнение сверху для текста и снизу для кнопки, середина прозрачная для яркого отображения трака */}
        <div className="absolute inset-0 bg-linear-to-b from-[#161D1C]/85 via-transparent to-[#123D39]/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-between lg:block py-6 sm:py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1">
          {/* Левая колонка: Заголовок, подзаголовок и кнопка */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full lg:h-auto lg:space-y-8">
            <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4 lg:pt-0">
              <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-white lg:text-[#161D1C] leading-[1.12] tracking-tight drop-shadow-xs lg:drop-shadow-none">
                {t.hero.title}
              </h1>

              <p className="font-body text-base sm:text-lg lg:text-xl text-[#F4F3EE] lg:text-[#161D1C]/80 leading-relaxed max-w-2xl drop-shadow-xs lg:drop-shadow-none">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Единая CTA кнопка */}
            <div className="pt-8 pb-4 sm:pb-0 lg:pt-4">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-xl font-headline font-bold text-base sm:text-lg bg-[#237D73] hover:bg-[#123D39] text-[#D9FF43] transition-all shadow-xl active:scale-98 cursor-pointer border border-[#D9FF43]/20"
              >
                <span>{t.hero.ctaButton}</span>
                <ArrowRight className="w-5 h-5 text-[#D9FF43]" />
              </button>
            </div>
          </div>

          {/* Правая колонка: Десктопное тематическое фото (на мобилке фоном служит 9:16) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#C9CFCC] shadow-xl">
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-[#123D39]">
                <Image
                  src="/images/hero-truck.jpg"
                  alt="Layner Group curtain-side truck"
                  fill
                  priority
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
