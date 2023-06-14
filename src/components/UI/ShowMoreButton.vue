<script lang="ts">
export default {
  name: 'ShowMoreButton',
};
</script>

<script setup lang="ts"></script>

<template>
  <button class="button">
    {{ $t('profile.show_more') }}
    <i class="arrow"></i>
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  padding: 6px 24px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  border: 0;
  outline: 0;
  border-radius: 6px;
  background-color: $main-hover;
  color: $black;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: $main-hover;
    background-color: $black;

    .arrow {
      background: url('@/assets/svg/down-arrow-hover.svg') center;
      background-size: 130%;
    }
  }

  & > .arrow {
    width: 9px;
    height: 5px;
    margin-left: 8px;
    background: url('@/assets/svg/down-arrow-black.svg') center;
    background-size: 130%;
    transform: translateY(1px);
    transition: all 0.3s ease;
  }
}
</style>
