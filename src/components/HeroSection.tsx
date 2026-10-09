"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { submitLead } from "@/lib/sendLead";
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";

interface HeroSectionProps {
  onSuccess: () => void;
}

export function HeroSection({ onSuccess }: HeroSectionProps) {
  const { t, lang } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const ok = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      form_type: "quick_hero",
      language: lang,
    });

    setIsSubmitting(false);
    if (ok) {
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#237D73", "#D9FF43", "#123D39"],
      });
      onSuccess();
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#237D73]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D9FF43]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Quick Lead Capture Form */}
          <div className="lg:col-span-7 space-y-7">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123D39]/10 border border-[#123D39]/20 text-[#123D39] text-xs font-accent tracking-wider font-bold">
              <span className="w-2 h-2 rounded-full bg-[#237D73]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl text-[#161D1C] leading-[1.05] tracking-tight">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="font-body text-lg sm:text-xl text-[#161D1C]/80 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Quick Hero Lead Capture Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#C9CFCC] shadow-lg shadow-black/5 max-w-xl">
              {submitted ? (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#237D73]/10 border border-[#237D73]/30">
                  <CheckCircle2 className="w-7 h-7 text-[#237D73] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-headline font-bold text-lg text-[#123D39]">
                      {t.form.successMessage}
                    </h4>
                    <p className="text-xs text-[#161D1C]/70 mt-1">
                      Менеджер свяжется с вами в течение рабочего дня.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#161D1C]/70 mb-1 font-body">
                        {t.form.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.hero.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4F3EE] border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#161D1C]/70 mb-1 font-body">
                        {t.form.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.hero.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4F3EE] border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-headline font-bold text-base bg-[#237D73] hover:bg-[#123D39] text-[#D9FF43] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? t.hero.loading : t.hero.ctaButton}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#D9FF43]" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#161D1C]/60 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#237D73]" />
                      WhatsApp связь без спама
                    </span>
                    <span>Ответ в течение рабочего дня</span>
                  </div>
                </form>
              )}
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#C9CFCC]/60 max-w-xl">
              <div>
                <span className="font-accent font-bold text-2xl text-[#123D39] block">
                  100%
                </span>
                <span className="text-xs text-[#161D1C]/70 leading-tight block">
                  Оплата каждого км
                </span>
              </div>
              <div>
                <span className="font-accent font-bold text-2xl text-[#123D39] block">
                  € ЕВРО
                </span>
                <span className="text-xs text-[#161D1C]/70 leading-tight block">
                  Прямые выплаты
                </span>
              </div>
              <div>
                <span className="font-accent font-bold text-2xl text-[#237D73] block">
                  24 / 7
                </span>
                <span className="text-xs text-[#161D1C]/70 leading-tight block">
                  Диспетчер в сети
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Thematic Truck Image with Floating Stats Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#123D39]/20 shadow-2xl group">
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-[#123D39]">
                <Image
                  src="/images/hero-truck.jpg"
                  alt="Layner Group curtain-side tautliner truck on European highway"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#123D39]/80 via-transparent to-black/20" />
              </div>

              {/* Bottom tag inside photo */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#123D39]/90 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                <div>
                  <span className="font-accent uppercase tracking-wider text-xs text-[#D9FF43] block">
                    Тентованные полуприцепы
                  </span>
                  <span className="font-headline font-semibold text-sm text-white">
                    Европейские маршруты под ключ
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#237D73] flex items-center justify-center text-white shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -top-4 -left-3 sm:-left-6 p-3.5 rounded-2xl bg-[#123D39] text-white shadow-xl border border-white/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D9FF43] text-[#123D39] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-headline font-bold text-xs uppercase tracking-wide">
                  Гарантированный
                </p>
                <p className="font-accent text-sm text-[#D9FF43] font-bold">
                  Километраж на месяц
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
