<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader/AppHeader.vue";
import AppFooter from "./components/AppFooter/AppFooter.vue";
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
