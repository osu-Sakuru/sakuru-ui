import type { IErrorResponse } from '@/interfaces/errorResponse.interface';
import type { UserStateOptions } from '@/interfaces/stateOptions.interface';
import type { User } from '@/interfaces/user.interface';
import { backendApi } from '@/main';
import type { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      isLoggedIn: false,
      user: {},
      language: undefined,
    } as UserStateOptions),
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
    isSelf(clause: string): boolean {
      if (!this.isLoggedIn) {
        return false;
      } else {
        return (
          this.user.name === clause ||
          this.user.email === clause ||
          this.user.safe_name === clause ||
          this.user.id.toString() === clause ||
          clause === 'me'
        );
      }
    },
  },
});
