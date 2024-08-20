import { i18nResources, LangCode } from "../i18n/configs";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof i18nResources.en;
  }
  interface i18n {
    language: LangCode;
    changeLanguage(lng?: LangCode, callback?: Callback): Promise<TFunction>;
  }
}
