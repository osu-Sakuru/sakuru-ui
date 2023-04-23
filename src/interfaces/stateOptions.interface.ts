import type { Locale } from '@/locales/locales.defaults';
import type { User } from './user.interface';

export interface UserStateOptions {
  isLoggedIn: boolean;
  user: User;
  language: Locale;
}

export interface MetaStateOptions {
  isMobile: boolean;
}
