import i18next from "i18next";
import translation_en from "./en.json";
import translation_ja from "./ja.json";
import { initReactI18next } from "react-i18next";

export const i18nResources = {
  en: {
    translation: translation_en,
  },
  ja: {
    translation: translation_ja,
  },
} as const;

i18next.use(initReactI18next).init({
  resources: i18nResources,
  lng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
