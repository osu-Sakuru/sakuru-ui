import { Locales } from './locales.defaults';

import en from './src/en-US.json';
import ua from './src/ua-UA.json';

export const messages = {
  [Locales.EN]: en,
  [Locales.UA]: ua,
};

export const defaultLocale = Locales.UA;
