import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Language = "AR" | "FR" | "EN";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  visible: boolean;
  openLanguageModal: () => void;
  closeLanguageModal: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("FR");
  const [visible, setVisible] = useState(false);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      visible,
      openLanguageModal: () => setVisible(true),
      closeLanguageModal: () => setVisible(false),
    }),
    [lang, visible]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider>");
  }
  return ctx;
}
