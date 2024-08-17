import { i18nResources } from "../i18n/configs";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof i18nResources.en;
  }
}
