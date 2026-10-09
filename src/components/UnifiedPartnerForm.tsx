"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { submitLead, validatePhone } from "@/lib/sendLead";
import { Send, CheckCircle2, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface UnifiedPartnerFormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export function UnifiedPartnerForm({ onSuccess, isModal = false }: UnifiedPartnerFormProps) {
  const { t, lang } = useLanguage();

  const [name, setName] = useState("");
  const [trucks, setTrucks] = useState("");
  const [departure, setDeparture] = useState("");
  const [phone, setPhone] = useState("");
  const [hasLicense, setHasLicense] = useState("Да");
  const [consent, setConsent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Строгая фильтрация ввода телефона: только цифры, +, пробел, дефис, скобки
  const handlePhoneChange = (val: string) => {
    const filtered = val.replace(/[^0-9+\s\-()]/g, "");
    setPhone(filtered);
    if (phoneError) {
      setPhoneError("");
    }
  };

  const handlePhoneBlur = () => {
    if (phone && !validatePhone(phone)) {
      setPhoneError(t.form.phoneError);
    }
  };

  const isPhoneValid = validatePhone(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    setConsentError("");

    if (!validatePhone(phone)) {
      setPhoneError(t.form.phoneError);
      return;
    }

    if (!consent) {
      setConsentError(t.form.consentError);
      return;
    }

    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const ok = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      truck_details: trucks.trim(),
      departure: departure.trim(),
      has_license: hasLicense === "Да" ? "Да" : "Нет",
      form_type: "full_application",
      language: lang,
    });

    setIsSubmitting(false);

    if (ok) {
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#237D73", "#D9FF43", "#123D39"],
      });
      if (onSuccess) onSuccess();
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 px-4 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#237D73] text-[#D9FF43] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#123D39]">
          {t.form.successMessage}
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* 1. Имя */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-1.5 font-accent">
            {t.form.nameLabel} *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.namePlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-white border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] transition-all"
          />
        </div>

        {/* 2. Телефон / WhatsApp со строгой валидацией */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-1.5 font-accent">
            {t.form.phoneLabel} *
          </label>
          <div className="relative">
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={handlePhoneBlur}
              placeholder={t.form.phonePlaceholder}
              className={`w-full px-4 py-3 rounded-xl bg-white border text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 transition-all ${
                phoneError
                  ? "border-red-500 focus:ring-red-500"
                  : isPhoneValid
                  ? "border-[#237D73] focus:ring-[#237D73]"
                  : "border-[#C9CFCC] focus:ring-[#237D73]"
              }`}
            />
            {isPhoneValid && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#237D73] text-[#D9FF43] flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          {phoneError && (
            <p className="text-xs text-red-600 font-medium mt-1">
              {phoneError}
            </p>
          )}
        </div>

        {/* 3. Количество тентованных машин и вес */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-1.5 font-accent">
            {t.form.truckLabel}
          </label>
          <input
            type="text"
            value={trucks}
            onChange={(e) => setTrucks(e.target.value)}
            placeholder={t.form.truckPlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-white border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] transition-all"
          />
        </div>

        {/* 4. Откуда выезжаете */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-1.5 font-accent">
            {t.form.departureLabel}
          </label>
          <input
            type="text"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder={t.form.departurePlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-white border border-[#C9CFCC] text-[#161D1C] placeholder-[#161D1C]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#237D73] transition-all"
          />
        </div>
      </div>

      {/* 5. Есть лицензия ЕС и CMR? */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#123D39] mb-1.5 font-accent">
          {t.form.licenseLabel}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
              hasLicense === "Да"
                ? "bg-[#237D73]/10 border-[#237D73] text-[#123D39] font-medium"
                : "bg-white border-[#C9CFCC] text-[#161D1C]/80"
            }`}
          >
            <input
              type="radio"
              name={isModal ? "license_modal" : "license_inline"}
              value="Да"
              checked={hasLicense === "Да"}
              onChange={(e) => setHasLicense(e.target.value)}
              className="accent-[#237D73]"
            />
            <span className="text-sm">{t.form.licenseYes}</span>
          </label>

          <label
            className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
              hasLicense === "Нет"
                ? "bg-[#237D73]/10 border-[#237D73] text-[#123D39] font-medium"
                : "bg-white border-[#C9CFCC] text-[#161D1C]/80"
            }`}
          >
            <input
              type="radio"
              name={isModal ? "license_modal" : "license_inline"}
              value="Нет"
              checked={hasLicense === "Нет"}
              onChange={(e) => setHasLicense(e.target.value)}
              className="accent-[#237D73]"
            />
            <span className="text-sm">{t.form.licenseNo}</span>
          </label>
        </div>
      </div>

      {/* Чекбокс согласия на обработку персональных данных */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (consentError) setConsentError("");
            }}
            className="w-4 h-4 mt-0.5 rounded border-[#C9CFCC] accent-[#237D73] text-[#237D73] cursor-pointer"
          />
          <span className="text-xs text-[#161D1C]/80 leading-relaxed font-body">
            {t.form.consentText}
          </span>
        </label>
        {consentError && (
          <p className="text-xs text-red-600 font-medium mt-1">
            {consentError}
          </p>
        )}
      </div>

      {/* Кнопка отправки */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-8 rounded-xl font-headline font-bold text-base bg-[#237D73] hover:bg-[#123D39] text-[#D9FF43] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99] disabled:opacity-75 cursor-pointer"
        >
          <Send className="w-5 h-5 text-[#D9FF43]" />
          <span>
            {isSubmitting ? t.form.submitting : t.form.submitButton}
          </span>
        </button>
      </div>
    </form>
  );
}
