import { Locales } from './locales.defaults';

import en from './src/en-US.json';
import ua from './src/ua-UA.json';
import tr from './src/tr-TR.json';

export const messages = {
  [Locales.EN]: en,
  [Locales.UA]: ua,
  [Locales.TR]: tr,
};

export const defaultLocale = Locales.EN;