import { useTranslation } from "react-i18next";
import { LangCode, Localizable } from "./configs";
import { exists } from "../util/exists";

export const useLocalizer = () => {
  const { i18n } = useTranslation();
  const localize = <T>(localizable: Localizable<T>, langCode?: LangCode): T => {
    if (exists(langCode)) {
      return localizable[langCode];
    } else {
      return localizable[i18n.language];
    }
  };

  return { localize };
};
