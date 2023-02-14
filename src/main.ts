import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import components from "@/components/UI";

const app = createApp(App);

app.use(createPinia());
app.use(router);

components.forEach((element: Component)  => {
  app.component(element.name!, element);
});

app.mount('#app');
