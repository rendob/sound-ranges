import type { Localizable } from "./i18n";
import i18n from "./i18n";

export const localize = <T>(localizable: Localizable<T>): T =>
  localizable[i18n.language];
