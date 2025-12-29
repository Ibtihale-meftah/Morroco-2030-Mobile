import React, { createContext, ReactNode, useContext, useState } from "react";

type Language = "FR" | "EN" | "AR";

interface LanguageContextType {
  lang: Language;
  visible: boolean;
  open: () => void;
  close: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("FR");
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return (
    <LanguageContext.Provider
      value={{ lang, visible, open, close, setLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
