"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UnifiedPartnerForm } from "./UnifiedPartnerForm";

interface PartnerFormProps {
  onSuccess: () => void;
}

export function PartnerForm({ onSuccess }: PartnerFormProps) {
  const { t } = useLanguage();

  return (
    <section id="apply" className="py-16 sm:py-24 bg-[#123D39] text-white scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {t.form.title}
          </h2>

          <p className="font-body text-base sm:text-lg text-[#F4F3EE]/80 mt-3 max-w-xl mx-auto">
            {t.form.subtitle}
          </p>
        </div>

        {/* Unified Form Container */}
        <div className="bg-[#F4F3EE] text-[#161D1C] rounded-3xl p-6 sm:p-10 border border-[#C9CFCC] shadow-2xl">
          <UnifiedPartnerForm onSuccess={onSuccess} isModal={false} />
        </div>
      </div>
    </section>
  );
}
