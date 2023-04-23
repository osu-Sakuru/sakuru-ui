import type { IErrorResponse } from '@/interfaces/errorResponse.interface';
import type { StateOptions } from '@/interfaces/stateOptions.interface';
import type { User } from '@/interfaces/user.interface';
import { DEFAULT_LOCALE } from '@/locales';
import { LANGUAGES } from '@/locales/locales.defaults';
import { backendApi } from '@/main';
import type { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      isLoggedIn: false,
      user: {},
      language: Object.assign({}, LANGUAGES.get(DEFAULT_LOCALE)),
    } as StateOptions),
  getters: {},
  actions: {
    async login(
      username: string,
      password: string,
      captchaToken: string,
    ): Promise<AxiosError<IErrorResponse> | void> {
      try {
        const request: AxiosResponse<User> = await backendApi.post(
          '/auth/login',
          {
            username: username,
            password: password,
            captcha_token: captchaToken,
          },
        );

        if (request && request.status < 400) {
          this.user = request?.data;

          this.isLoggedIn = true;
        } else {
          console.log(request);
        }
      } catch (error: unknown) {
        return error as AxiosError<IErrorResponse>;
      }
    },
    logout(): void {
      if (this.isLoggedIn) {
        this.user = {} as User;
        this.isLoggedIn = false;
      }
    },
  },
});
