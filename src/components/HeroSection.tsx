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
    <section className="relative overflow-hidden pt-12 pb-20 sm:py-20 lg:py-24">
      {/* 9:16 Фоновое изображение для мобильной версии на всю Hero-секцию */}
      <div className="lg:hidden absolute inset-0 z-0">
        <Image
          src="/images/hero-truck-mobile.jpg"
          alt="Layner Group curtain-side truck"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Премиальный градиентный оверлей для идеальной читаемости */}
        <div className="absolute inset-0 bg-linear-to-b from-[#123D39]/75 via-[#123D39]/85 to-[#123D39]/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Левая колонка: Заголовок, подзаголовок и кнопка перехода к форме */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-white lg:text-[#161D1C] leading-[1.1] tracking-tight">
              {t.hero.title}
            </h1>

            <p className="font-body text-base sm:text-lg lg:text-xl text-[#F4F3EE]/90 lg:text-[#161D1C]/80 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Единая CTA кнопка */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-xl font-headline font-bold text-base sm:text-lg bg-[#237D73] hover:bg-[#123D39] text-[#D9FF43] transition-all shadow-lg active:scale-98 cursor-pointer"
              >
                <span>{t.hero.ctaButton}</span>
                <ArrowRight className="w-5 h-5 text-[#D9FF43]" />
              </button>
            </div>
          </div>

          {/* Правая колонка: Десктопное тематическое фото (скрыто на мобилке, где работает 9:16 фон) */}
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
