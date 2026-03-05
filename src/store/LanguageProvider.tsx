import { createContext, useContext, useEffect, useState } from "react";
import i18n from "../lib/i18n/i18n";
interface LanguageContextProps {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}
const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);
interface LanguageProviderProps {
  children: React.ReactNode;
}
const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <div>{children}</div>
    </LanguageContext.Provider>
  );
};
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("use language must be used in langugae provider");
  }
  return context;
};
export default LanguageProvider;
