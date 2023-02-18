import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment() {
      this.count++;
    },
  },

  persist: true,
});
