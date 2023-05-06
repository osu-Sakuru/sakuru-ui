import type { IGeolocationAPIRespose } from './interfaces/ipAPIResponse.interface';
import {
  LANGUAGES,
  type LocalesEnum,
  type Locale,
} from './locales/locales.defaults';

export function buildIconURI(iconPath: string): string {
  return `url('${iconPath}')`;
}

export function detectMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export async function detectLanguage(): Promise<Locale | undefined> {
  // Make our own geolocation API because ipapi.co is not free anymore
  const response: IGeolocationAPIRespose = await (
    await fetch('https://ipapi.co/json/')
  ).json();

  const languageCode: string =
    response.languages.split(',')[0] +
    '_' +
    response.country_code.toUpperCase();

  return LANGUAGES.get(languageCode as LocalesEnum);
}
