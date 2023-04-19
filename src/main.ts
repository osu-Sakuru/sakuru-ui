import { createApp, type Component, onMounted } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';
import {
  createPlugin,
  defineScriptLoader,
  toQueryString,
  type RecaptchaParams,
} from 'vue-recaptcha';

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

const loadScript = defineScriptLoader(
  (options: {
    recaptchaApiURL: string;
    params: RecaptchaParams;
    nonce: string | undefined;
  }) => {
    return () => {
      onMounted(() => {
        const script = document.createElement('script');

        script.src = `${options.recaptchaApiURL}?${toQueryString(
          options.params,
        )}`;
        script.async = true;
        script.defer = true;

        if (options.nonce) script.nonce = options.nonce;

        document.head.append(script);
      });
    };
  },
);

const app = createApp(App);
const pinia = createPinia();

pinia.use((ctx) => {
  createPersistedStatePlugin()(ctx);
});

app.use(VueCookies);
app.use(pinia);
app.use(createPlugin(loadScript), {
  v3SiteKey: import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY,
});

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

            next({
              path: '/home',
            });
          });
      } else if (userStore.isLoggedIn) {
        next({
          path: '/home',
        });
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
