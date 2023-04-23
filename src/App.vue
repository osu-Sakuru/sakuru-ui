<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import AppFooter from './components/AppFooter/AppFooter.vue';
import i18n from '@/locales/locales.main';
import { useUserStore } from './stores/user';
import { inject, onMounted } from 'vue';
import { backendApi } from './main';
import type { VueCookies } from 'vue-cookies';
import { useRecaptchaProvider } from 'vue-recaptcha';

const userStore = useUserStore();
const cookies = inject<VueCookies>('$cookies');

i18n.global.locale.value = userStore.language.value;

onMounted(() => {
  window.dispatchEvent(new Event('showHeader'));
  window.dispatchEvent(new Event('showFooter'));

  backendApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        cookies?.remove('token');
        userStore.logout();
      }

      return Promise.reject(error);
    },
  );
});

useRecaptchaProvider();
</script>

<template>
  <AppHeader />
  <Suspense>
    <main>
      <RouterView />
    </main>
  </Suspense>
  <AppFooter />
</template>

<style lang="scss">
html {
  background: #1b1b1b;
  color: $main;
}

.reg__captcha_agreement {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 13px;
  line-height: 16px;
  color: #b5b5b5;
  margin-top: 10px;
  margin-left: 4vh;
  margin-right: 4vh;

  a {
    font-style: normal;
    text-decoration: none;
    color: $main;
    transition: color 0.3s ease;

    &:hover {
      color: $main-hover;
    }
  }
}

.footer__captcha_agreement {
  font-size: 13px;
  line-height: 16px;
  color: #b5b5b5;
  margin-top: 10px;

  a {
    font-style: normal;
    text-decoration: none;
    color: $main;
    transition: color 0.3s ease;

    &:hover {
      color: $main-hover;
    }
  }
}

.grecaptcha-badge {
  visibility: hidden;
}
</style>
