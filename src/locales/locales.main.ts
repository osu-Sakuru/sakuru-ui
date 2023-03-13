import { createI18n } from 'vue-i18n';
import { defaultLocale, messages } from '.';

export default createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    ...messages,
  },
  globalInjection: true,
});
