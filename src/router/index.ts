import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HomeLoggedIn from '@/views/HomeLoggedIn.vue';

const user = {
  role: "user",
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => {
        switch (user.role) {
          case "guest":
            return HomeView;
          case "user":
            return HomeLoggedIn;
        }
      }
    },
  ]
});

export default router;
