"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { submitLead } from "@/lib/sendLead";
import {
  Send,
  CheckCircle2,
  Lock,
  MessageSquare,
  ShieldCheck,
  Truck,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PartnerFormProps {
  onSuccess: () => void;
}

export function PartnerForm({ onSuccess }: PartnerFormProps) {
  const { t, lang } = useLanguage();

  const [name, setName] = useState("");
  const [trucks, setTrucks] = useState("");
  const [departure, setDeparture] = useState("");
  const [phone, setPhone] = useState("");
  const [hasLicense, setHasLicense] = useState("Да");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert("Пожалуйста, подтвердите согласие на обработку персональных данных.");
      return;
    }
    if (!name.trim() || !phone.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const ok = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      truck_details: trucks.trim(),
      departure: departure.trim(),
      has_license: hasLicense,
      form_type: "full_application",
      language: lang,
    });

    setIsSubmitting(false);

    if (ok) {
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#237D73", "#D9FF43", "#123D39"],
      });
      onSuccess();
    }
  };

  return (
    <section id="apply" className="py-16 sm:py-24 bg-[#123D39] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D9FF43] text-xs font-accent tracking-wider font-bold mb-3">
            <MessageSquare className="w-4 h-4" />
            <span>ПРЯМАЯ СВЯЗЬ С ЛОГИСТАМИ</span>
          </div>

          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {t.form.title}
          </h2>

          <p className="font-body text-base sm:text-lg text-[#F4F3EE]/80 mt-3 max-w-xl mx-auto">
            {t.form.subtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#F4F3EE] text-[#161D1C] rounded-3xl p-6 sm:p-10 border border-[#C9CFCC] shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#237D73] text-[#D9FF43] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#123D39]">
                {t.form.successMessage}
              </h3>
              <p className="font-body text-sm sm:text-base text-[#161D1C]/70 max-w-md mx-auto">
                Данные успешно переданы в диспетчерский отдел. Мы свяжемся с вами в WhatsApp для согласования маршрута и ставки.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl font-headline font-semibold text-sm bg-[#123D39] text-[#D9FF43]"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Имя */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-2 font-accent">
                    {t.form.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.form.namePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] focus:border-transparent transition-all"
                  />
                </div>

                {/* 2. Телефон / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-2 font-accent">
                    {t.form.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.form.phonePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] focus:border-transparent transition-all"
                  />
                </div>

                {/* 3. Количество тентованных машин и вес */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-2 font-accent">
                    {t.form.truckLabel}
                  </label>
                  <input
                    type="text"
                    value={trucks}
                    onChange={(e) => setTrucks(e.target.value)}
                    placeholder={t.form.truckPlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] focus:border-transparent transition-all"
                  />
                </div>

                {/* 4. Откуда выезжаете */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-2 font-accent">
                    {t.form.departureLabel}
                  </label>
                  <input
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder={t.form.departurePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* 5. Есть лицензия ЕС и CMR? */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-2 font-accent">
                  {t.form.licenseLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      hasLicense === "Да"
                        ? "bg-[#237D73]/10 border-[#237D73] text-[#123D39] font-medium"
                        : "bg-white border-[#C9CFCC] text-[#161D1C]/80 hover:bg-[#D9E0DD]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="license"
                      value="Да"
                      checked={hasLicense === "Да"}
                      onChange={(e) => setHasLicense(e.target.value)}
                      className="accent-[#237D73]"
                    />
                    <span className="text-sm">{t.form.licenseYes}</span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      hasLicense === "В процессе"
                        ? "bg-[#237D73]/10 border-[#237D73] text-[#123D39] font-medium"
                        : "bg-white border-[#C9CFCC] text-[#161D1C]/80 hover:bg-[#D9E0DD]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="license"
                      value="В процессе"
                      checked={hasLicense === "В процессе"}
                      onChange={(e) => setHasLicense(e.target.value)}
                      className="accent-[#237D73]"
                    />
                    <span className="text-sm">{t.form.licenseNo}</span>
                  </label>
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-[#C9CFCC] accent-[#237D73] text-[#237D73]"
                  />
                  <span className="text-xs text-[#161D1C]/75 leading-relaxed font-body">
                    {t.form.consentText}
                  </span>
                </label>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl font-headline font-bold text-base bg-[#237D73] hover:bg-[#123D39] text-[#D9FF43] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                >
                  <Send className="w-5 h-5 text-[#D9FF43]" />
                  <span>
                    {isSubmitting ? t.form.submitting : t.form.submitButton}
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#161D1C]/60 pt-2 border-t border-[#C9CFCC]/60 gap-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#237D73]" />
                  Безопасная передача данных в Google Sheets
                </span>
                <span>Менеджер напишет в WhatsApp</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
