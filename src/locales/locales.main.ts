import { createI18n } from 'vue-i18n';
import { DEFAULT_LOCALE, messages } from '.';

export default createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    ...messages,
  },
  globalInjection: true,
});
