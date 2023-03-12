import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HomeLoggedIn from '@/views/HomeLoggedIn.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'home_logged_in',
      component: HomeLoggedIn,
      meta: {
        requiresAuth: true,
      }
    }
  ]
});

export default router;
