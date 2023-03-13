import type { Locales } from '@/locales/locales.defaults';
import type { User } from './user.interface';

export interface StateOptions {
  isLoggedIn: boolean;
  user: User;
  language: Locales;
}
