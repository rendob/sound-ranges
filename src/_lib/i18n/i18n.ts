import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEn from "./locale/en.json";
import translationJa from "./locale/ja.json";

export const langCodes = ["en", "ja"] as const;
export type LangCode = (typeof langCodes)[number];
type Localizable<T> = { [key in LangCode]: T };

export const resources = {
  en: {
    translation: translationEn,
  },
  ja: {
    translation: translationJa,
  },
} as const satisfies Localizable<{ translation: typeof translationEn }>;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: langCodes[0],
    supportedLngs: langCodes,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
