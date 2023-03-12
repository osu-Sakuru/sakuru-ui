import type { User } from './user.interface';

export interface StateOptions {
  isLoggedIn: boolean;
  user: User;
}
