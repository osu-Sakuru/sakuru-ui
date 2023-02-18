import { createI18n } from "vue-i18n";
import ua from "./locales/ua.json";
import en from "./locales/en.json";

export default createI18n({
  legacy: false,
  locale: "ua",
  fallbackLocale: "en",
  messages: {
    ua,
    en,
  },
  globalInjection: true,
});
