<script lang="ts">
export default {
  name: 'AppLogo',
};
</script>

<template>
  <RouterLink class="logo" to="/">
    <img src="@/assets/svg/logo.svg" alt="sakuru-logo" draggable="false" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  height: 84px;
}
</style>
