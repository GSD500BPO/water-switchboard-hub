import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, TranslationKey } from "@/lib/translations";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("cwt-language");
    return (saved as Language) || "es"; // Default to Spanish
  });

  useEffect(() => {
    localStorage.setItem("cwt-language", language);
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
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
