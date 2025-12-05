import type { LangCode, resources } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources.en;
  }
  interface i18n {
    language: LangCode;
    changeLanguage(lng?: LangCode, callback?: Callback): Promise<TFunction>;
  }
}
