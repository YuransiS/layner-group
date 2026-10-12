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
        {/* Продуманный градиент для максимальной читаемости текста и сохранения чистого обзора фургона:
            - 0% - 35%: глубокое затемнение графитом (#161D1C), устраняющее блики от белых облаков и снежных гор
            - 45% - 72%: полупрозрачное окно, полностью открывающее фургон и альпийскую дорогу
            - 75% - 100%: плавный уход в темный тил (#123D39) под кнопку действия */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(22, 29, 28, 0.95) 0%, rgba(22, 29, 28, 0.90) 30%, rgba(22, 29, 28, 0.48) 45%, rgba(22, 29, 28, 0.05) 58%, rgba(18, 61, 57, 0.15) 72%, rgba(18, 61, 57, 0.96) 100%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-between lg:block py-6 sm:py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1">
          {/* Левая колонка: Бейдж, Заголовок, подзаголовок, чипсы и кнопка */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full lg:h-auto lg:space-y-8">
            <div className="space-y-3 sm:space-y-5 pt-2 sm:pt-4 lg:pt-0">
              {/* Бейдж европейской логистики */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161D1C]/80 lg:bg-[#237D73]/10 border border-white/20 lg:border-[#237D73]/25 backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D9FF43] lg:bg-[#237D73] animate-pulse" />
                  <span className="font-headline font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#D9FF43] lg:text-[#237D73]">
                    {t.hero.badge}
                  </span>
                </div>
              </div>

              {/* Заголовок с цветовым акцентом бренда */}
              <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-white lg:text-[#161D1C] leading-[1.12] tracking-tight drop-shadow-md lg:drop-shadow-none">
                {t.hero.titlePrefix}
                <span className="text-[#D9FF43] lg:text-[#237D73] block sm:inline">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              {/* Подзаголовок с повышенной читаемостью */}
              <p className="font-body text-base sm:text-lg lg:text-xl text-[#F4F3EE]/95 lg:text-[#161D1C]/80 leading-relaxed max-w-2xl drop-shadow-sm lg:drop-shadow-none">
                {t.hero.subtitle}
              </p>

              {/* Ключевые акцентные преимущества в виде компактных тегов */}
              <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                {t.hero.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-[#161D1C]/75 lg:bg-white/90 text-white lg:text-[#161D1C] border border-white/15 lg:border-[#C9CFCC] backdrop-blur-md shadow-xs"
                  >
                    <span className="text-[#D9FF43] lg:text-[#237D73] font-bold">✓</span>
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Единая CTA кнопка */}
            <div className="pt-6 pb-4 sm:pb-0 lg:pt-4">
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
