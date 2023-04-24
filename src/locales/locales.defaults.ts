export interface Locale {
  value: LocalesEnum;
  caption: string;
  alfa2: string;
}

export enum LocalesEnum {
  en_US = 'en_US',
  uk_UA = 'uk_UA',
  tr_TR = 'tr_TR',
  de_DE = 'de_DE',
  nl_NL = 'nl_NL',
}

export const LANGUAGES: Map<LocalesEnum, Locale> = new Map<LocalesEnum, Locale>(
  [
    [
      LocalesEnum.en_US,
      { value: LocalesEnum.en_US, caption: 'English (US)', alfa2: 'us' },
    ],
    [
      LocalesEnum.uk_UA,
      { value: LocalesEnum.uk_UA, caption: 'Українська', alfa2: 'ua' },
    ],
    [
      LocalesEnum.tr_TR,
      { value: LocalesEnum.tr_TR, caption: 'Türkçe', alfa2: 'tr' },
    ],
    [
      LocalesEnum.de_DE,
      { value: LocalesEnum.de_DE, caption: 'Deutsch', alfa2: 'de' },
    ],
    [
      LocalesEnum.nl_NL,
      { value: LocalesEnum.nl_NL, caption: 'Dutch (NL)', alfa2: 'nl' },
    ],
  ],
);
