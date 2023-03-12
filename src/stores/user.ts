import { backendApi } from "@/main";
import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";

interface User {
  id: number;
  name: string;
  safe_name: string;
  email: string;
  priv: number;
  pw_bcrypt: string;
  country: string;
  silence_end: number;
  donor_end: number;
  creation_time: number;
  latest_activity: number;
  clan_id: number;
  clan_priv: boolean;
  preferred_mode: number;
  play_style: number;
  custom_badge_name: string | null;
  custom_badge_icon: string | null;
  userpage_content: string | null;
}

interface StateOptions {
  isLoggedIn: boolean;
  user: User;
}

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      isLoggedIn: false,
      user: {},
    } as StateOptions),
  getters: {},
  actions: {
    async login(username: string, password: string): Promise<void> {
      try {
        const request: AxiosResponse<User> = await backendApi.post(
          "/auth/login",
          {
            username: username,
            password: password,
          }
        );

        if (request && request.status < 400) {
          this.user = request?.data;

          this.isLoggedIn = true;
        } else {
          console.log("Wotefak mazafak xD");
        }
      } catch (error: unknown) {
        console.log(error);
      }
    },
    async logout(): Promise<void> {
      try {
        const request: AxiosResponse<void> = await backendApi.get(
          "/auth/logout"
        );

        if (request && request.status < 400) {
          this.user = {} as User;

          this.isLoggedIn = false;
        } else {
          console.log("Wotefak mazafak xD");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: true,
});
