import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';
import components from "@/components/UI";
import i18n from './i18n';
import axios from 'axios';

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

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(i18n);

components.forEach((element: Component)  => {
  app.component(element.name!, element);
});

app.mount('#app');
