import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';

import App from './App.vue';
import router from './router';
import components from '@/components/UI';
import i18n from './locales/locales.main';
import axios from 'axios';
import VueCookies from 'vue-cookies';

export const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
  timeout: 5000,
  withCredentials: true,
});
export const banchoApi = axios.create({
  baseURL: import.meta.env.VITE_BANCHO_API,
  timeout: 5000,
});

const app = createApp(App);
const pinia = createPinia();

pinia.use((ctx) => {
  createPersistedStatePlugin()(ctx);
});

app.use(VueCookies);
app.use(pinia);

import { useUserStore } from '@/stores/user';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
const userStore = useUserStore();
const { $cookies } = app.config.globalProperties;

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!userStore.isLoggedIn) {
        if ($cookies?.get('token')) {
          backendApi
            .get('/users/me')
            .catch()
            .then((response) => {
              userStore.isLoggedIn = true;
              userStore.user = response.data;

              next();
            });
        } else {
          next({
            path: '/',
          });
        }
      } else {
        next();
      }
    } else {
      if ($cookies?.get('token') && !userStore.isLoggedIn) {
        backendApi
          .get('/users/me')
          .catch()
          .then((response) => {
            userStore.isLoggedIn = true;
            userStore.user = response.data;

            if (to.meta.requiresAuth === undefined) {
              next({
                path: '/home',
              });
            } else {
              next();
            }
          });
      } else if (userStore.isLoggedIn) {
        if (to.meta.requiresAuth === undefined) {
          next({
            path: '/home',
          });
        } else {
          next();
        }
      } else {
        next();
      }
    }
  },
);

app.use(router);
app.use(i18n);

components.forEach((element: Component) => {
  app.component(element.name!, element);
});

app.mount('#app');
