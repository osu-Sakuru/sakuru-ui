import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HomeLoggedIn from '@/views/HomeLoggedIn.vue';
import RegView from '@/views/RegView.vue';
import ProfileView from '@/views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/home',
      name: 'home_logged_in',
      component: HomeLoggedIn,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/users/:user',
      name: 'profile',
      component: ProfileView,
      alias: '/u/:user',
      meta: {
        requiresAuth: false,
        public: true,
      },
    },
  ],
});

export default router;
