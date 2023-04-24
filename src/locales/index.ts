import { LocalesEnum } from './locales.defaults';

import en from './src/en-US.json';
import ua from './src/uk-UA.json';
import tr from './src/tr-TR.json';
import de from './src/de-DE.json';
import nl from './src/nl-NL.json';

export const messages = {
  [LocalesEnum.en_US]: en,
  [LocalesEnum.uk_UA]: ua,
  [LocalesEnum.tr_TR]: tr,
  [LocalesEnum.de_DE]: de,
  [LocalesEnum.nl_NL]: nl,
};

export const DEFAULT_LOCALE = LocalesEnum.en_US;
