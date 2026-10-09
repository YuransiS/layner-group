"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { submitLead, validatePhone } from "@/lib/sendLead";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface HeroSectionProps {
  onSuccess: () => void;
}

export function HeroSection({ onSuccess }: HeroSectionProps) {
  const { t, lang } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!validatePhone(phone)) {
      setPhoneError(t.form.phoneError);
      return;
    }

    if (!name.trim() || isSubmitting) return;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Form strictly from ТЗ */}
          <div className="lg:col-span-7 space-y-7">
            <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl text-[#161D1C] leading-[1.08] tracking-tight">
              {t.hero.title}
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#161D1C]/80 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Quick Hero Lead Form */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#C9CFCC] shadow-md max-w-xl">
              {submitted ? (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#237D73]/10 border border-[#237D73]/30">
                  <CheckCircle2 className="w-7 h-7 text-[#237D73] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-headline font-bold text-lg text-[#123D39]">
                      {t.form.successMessage}
                    </h4>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.hero.namePlaceholder}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#F4F3EE] border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        placeholder={t.hero.phonePlaceholder}
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#F4F3EE] border text-[#161D1C] placeholder-[#161D1C]/50 text-sm focus:outline-none focus:ring-2 transition-all ${
                          phoneError
                            ? "border-red-500 focus:ring-red-500"
                            : "border-[#C9CFCC] focus:ring-[#237D73]"
                        }`}
                      />
                    </div>
                  </div>

                  {phoneError && (
                    <p className="text-xs text-red-600 font-medium">
                      {phoneError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-headline font-bold text-base bg-[#237D73] hover:bg-[#123D39] text-[#D9FF43] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
                  >
                    <span>
                      {isSubmitting ? t.hero.loading : t.hero.ctaButton}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#D9FF43]" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Clean Thematic Truck Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#C9CFCC] shadow-xl">
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-[#123D39]">
                <Image
                  src="/images/hero-truck.jpg"
                  alt="Layner Group curtain-side truck"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
