"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UnifiedPartnerForm } from "./UnifiedPartnerForm";
import { X } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LeadModal({ isOpen, onClose, onSuccess }: LeadModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#F4F3EE] rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 border border-[#C9CFCC] shadow-2xl text-[#161D1C]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#D9E0DD] text-[#161D1C]/60 hover:text-[#161D1C] transition-colors cursor-pointer"
          aria-label="Close form modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-6">
          <h3 className="font-headline font-bold text-2xl text-[#123D39]">
            {t.form.title}
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#161D1C]/75 mt-1">
            {t.form.subtitle}
          </p>
        </div>

        <UnifiedPartnerForm
          onSuccess={() => {
            onClose();
            onSuccess();
          }}
          isModal={true}
        />
      </div>
    </div>
  );
}
