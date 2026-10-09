"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, Translations, translations } from "@/data/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function detectUserLanguage(): Language {
  if (typeof window === "undefined") return "ru";

  const saved = localStorage.getItem("layner_lang") as Language | null;
  if (saved && (saved === "ru" || saved === "bg" || saved === "ro")) {
    return saved;
  }

  const browserLang = (
    navigator.language || (navigator.languages && navigator.languages[0]) || ""
  ).toLowerCase();

  if (browserLang.startsWith("bg")) {
    return "bg";
  }
  if (browserLang.startsWith("ro") || browserLang.startsWith("mo")) {
    return "ro";
  }
  if (
    browserLang.startsWith("ru") ||
    browserLang.startsWith("uk") ||
    browserLang.startsWith("be") ||
    browserLang.startsWith("kk")
  ) {
    return "ru";
  }

  // Default fallback to Russian as primary source language
  return "ru";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ru");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectUserLanguage();
    setLangState(detected);
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("layner_lang", newLang);
    }
  };

  const t = translations[lang] || translations.ru;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div data-lang={lang} data-hydrated={mounted ? "true" : "false"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
