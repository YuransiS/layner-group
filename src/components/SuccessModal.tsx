"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#F4F3EE] rounded-3xl p-7 border border-[#C9CFCC] shadow-2xl text-center space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#D9E0DD] text-[#161D1C]/60 hover:text-[#161D1C] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#237D73] text-[#D9FF43] mx-auto flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#123D39]">
            {t.form.successMessage}
          </h3>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl font-headline font-bold text-sm bg-[#123D39] text-[#D9FF43] hover:bg-[#237D73] transition-colors shadow-xs cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
