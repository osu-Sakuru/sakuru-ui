import { LocalesEnum } from './locales.defaults';

// Source translations
import en from './sources/en-US.json';
import ua from './sources/uk-UA.json';

// Translations
import tr from './translations/tr-TR.json';
import de from './translations/de-DE.json';
import nl from './translations/nl-NL.json';
import cs from './translations/cs-CZ.json';

export const messages = {
  [LocalesEnum.en_US]: en,
  [LocalesEnum.uk_UA]: ua,
  [LocalesEnum.tr_TR]: tr,
  [LocalesEnum.de_DE]: de,
  [LocalesEnum.nl_NL]: nl,
  [LocalesEnum.cs_CZ]: cs,
};

export const DEFAULT_LOCALE = LocalesEnum.en_US;
