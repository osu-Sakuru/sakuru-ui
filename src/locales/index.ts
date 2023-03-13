import { LocalesEnum } from './locales.defaults';

import en from './src/en-US.json';
import ua from './src/ua-UA.json';
import tr from './src/tr-TR.json';

export const messages = {
  [LocalesEnum.en_US]: en,
  [LocalesEnum.ua_UA]: ua,
  [LocalesEnum.tr_TR]: tr,
};

export const DEFAULT_LOCALE = LocalesEnum.en_US;
