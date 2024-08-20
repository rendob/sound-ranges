import i18next from "i18next";
import translation_en from "./locale/en.json";
import translation_ja from "./locale/ja.json";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const langCodes = ["en", "ja"] as const;
export type LangCode = (typeof langCodes)[number];
export type Localizable<T> = { [key in LangCode]: T };
export const i18nResources = {
  en: {
    translation: translation_en,
  },
  ja: {
    translation: translation_ja,
  },
} as const satisfies Localizable<{ translation: typeof translation_en }>;

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    supportedLngs: langCodes,
    resources: i18nResources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
