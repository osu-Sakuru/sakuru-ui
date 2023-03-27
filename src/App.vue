<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import AppFooter from './components/AppFooter/AppFooter.vue';
import i18n from '@/locales/locales.main';
import { useUserStore } from './stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore();
i18n.global.locale.value = userStore.language.value;

onMounted(() => {
  window.dispatchEvent(new Event('showHeader'));
  window.dispatchEvent(new Event('showFooter'));
});
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
</style>
