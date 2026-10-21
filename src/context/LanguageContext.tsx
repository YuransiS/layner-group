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
  if (typeof window === "undefined") return initial || "ro";

  // 1. Приоритет №1: Явный URL путь (/bg, /ro)
  const pathname = window.location.pathname.toLowerCase();
  if (pathname === "/bg" || pathname.startsWith("/bg/")) return "bg";
  if (pathname === "/ro" || pathname.startsWith("/ro/")) return "ro";

  // 2. Приоритет №2: Query параметр ?lang=bg или ?lang=ro (критично для рекламного трафика)
  try {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get("lang")?.toLowerCase();
    if (qLang === "bg") return "bg";
    if (qLang === "ro") return "ro";
  } catch {}

  // 3. Приоритет №3: Сохраненный выбор в localStorage
  try {
    const saved = localStorage.getItem("layner_lang") as Language | null;
    if (saved && (saved === "ro" || saved === "bg")) {
      return saved;
    }
  } catch {}

  // 4. Приоритет №4: Явно переданный initialLang от роутера
  if (initial && (initial === "ro" || initial === "bg")) {
    return initial;
  }

  // 5. Приоритет №5: Определение по языкам браузера
  const navLangs: string[] = (
    navigator.languages && navigator.languages.length > 0
      ? Array.from(navigator.languages)
      : [navigator.language || ""]
  ).map((l) => (l || "").toLowerCase());

  for (const bl of navLangs) {
    if (bl.startsWith("bg")) return "bg";
    if (bl.startsWith("ro") || bl.startsWith("mo")) return "ro";
  }

  // 6. Приоритет №6: Определение по часовому поясу (для устройств на English)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Europe/Sofia") return "bg";
    if (tz === "Europe/Bucharest" || tz === "Europe/Chisinau") return "ro";
  } catch {}

  // Основной язык по умолчанию — румынский (ro)
  return "ro";
}

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(() => {
    return detectUserLanguage(initialLang);
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectUserLanguage(initialLang);
    setLangState(detected);
    if (typeof document !== "undefined") {
      document.documentElement.lang = detected;
    }
    setMounted(true);
  }, [initialLang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("layner_lang", newLang);
      } catch {}
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLang;
      }
    }
  };

  const t = translations[lang] || translations.ro;

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
