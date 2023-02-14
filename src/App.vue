<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from "@/components/AppHeader/AppHeader.vue";

</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style lang="scss">
  html {
    background: #1B1B1B;
    color: $main;
  }
</style>
