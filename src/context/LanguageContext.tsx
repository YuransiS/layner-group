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

export function detectUserLanguage(initial?: Language): Language {
  if (initial && (initial === "ru" || initial === "bg" || initial === "ro")) {
    return initial;
  }
  if (typeof window === "undefined") return "ru";

  // 1. URL Path (/ro, /bg, /ru) — высший приоритет для рекламного трафика
  const pathname = window.location.pathname.toLowerCase();
  if (pathname === "/ro" || pathname.startsWith("/ro/")) return "ro";
  if (pathname === "/bg" || pathname.startsWith("/bg/")) return "bg";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";

  // 2. Query параметр ?lang=ro
  const params = new URLSearchParams(window.location.search);
  const qLang = params.get("lang")?.toLowerCase();
  if (qLang === "ro" || qLang === "bg" || qLang === "ru") {
    return qLang as Language;
  }

  // 3. Сохраненный выбор в localStorage
  const saved = localStorage.getItem("layner_lang") as Language | null;
  if (saved && (saved === "ru" || saved === "bg" || saved === "ro")) {
    return saved;
  }

  // 4. Определение по браузеру пользователя
  const browserLang = (
    navigator.language || (navigator.languages && navigator.languages[0]) || ""
  ).toLowerCase();

  if (browserLang.startsWith("bg")) {
    return "bg";
  }
  if (browserLang.startsWith("ro") || browserLang.startsWith("mo")) {
    return "ro";
  }

  return "ru";
}

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(() => {
    return initialLang || detectUserLanguage(initialLang);
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (initialLang) {
      setLangState(initialLang);
      localStorage.setItem("layner_lang", initialLang);
    } else {
      const detected = detectUserLanguage();
      setLangState(detected);
    }
    setMounted(true);
  }, [initialLang]);

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
