import type { StateOptions } from '@/interfaces/stateOptions.interface';
import type { User } from '@/interfaces/user.interface';
import { Locales } from '@/locales/locales.defaults';
import { backendApi } from '@/main';
import type { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      isLoggedIn: false,
      user: {},
      language: Locales.EN,
    } as StateOptions),
  getters: {},
  actions: {
    async login(username: string, password: string): Promise<void> {
      try {
        const request: AxiosResponse<User> = await backendApi.post(
          '/auth/login',
          {
            username: username,
            password: password,
          },
        );

        if (request && request.status < 400) {
          this.user = request?.data;

          this.isLoggedIn = true;
        } else {
          console.log('Wotefak mazafak xD');
        }
      } catch (error: unknown) {
        console.log(error);
      }
    },
    async logout(): Promise<void> {
      try {
        const request: AxiosResponse<void> = await backendApi.get(
          '/auth/logout',
        );

        if (request && request.status < 400) {
          this.user = {} as User;

          this.isLoggedIn = false;
        } else {
          console.log('Wotefak mazafak xD');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: true,
});
