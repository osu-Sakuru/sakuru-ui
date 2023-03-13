<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import AppFooter from './components/AppFooter/AppFooter.vue';
import i18n from '@/locales/locales.main';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
i18n.global.locale.value = userStore.language.value;
</script>

<template>
  <AppHeader />
  <Suspense>
    <RouterView />
  </Suspense>
  <AppFooter />
</template>

<style lang="scss">
html {
  background: #1b1b1b;
  color: $main;
}
</style>
