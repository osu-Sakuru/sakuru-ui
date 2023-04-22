<script lang="ts">
import { defineComponent } from 'vue';
import { LocalesEnum, LANGUAGES } from '@/locales/locales.defaults';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import i18n from '@/locales/locales.main';

export default defineComponent({
  name: 'LangSwitcher',
});
</script>

<script setup lang="ts">
const getFlagUrl = (alfa2: string): string => {
  return new URL(`/src/assets/svg/flags/${alfa2}.svg`, import.meta.url).href;
};

const userStore = useUserStore();

const setLocale = (locale: LocalesEnum): void => {
  i18n.global.locale.value = locale;
  userStore.language = LANGUAGES.get(locale)!;
};

const menuActive = ref(false);
const menuHandler = () => (menuActive.value = !menuActive.value);
</script>

<template>
  <div @mouseover="menuHandler" @mouseout="menuHandler" class="lang__switcher">
    <div class="lang__select" :class="{ 'menu-active': menuActive }">
      <img :src="getFlagUrl(userStore.language.alfa2)" />
      {{ userStore.language.caption }}
    </div>
    <ul v-show="menuActive" class="lang__options">
      <li
        v-for="locale in LANGUAGES.values()"
        @click="setLocale(locale.value)"
        :key="locale.value"
      >
        <img :src="getFlagUrl(locale.alfa2)" />
        {{ locale.caption }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.lang__switcher {
  position: relative;
  display: flex;
  min-width: 170px;
  flex-direction: column;
  margin-left: 20px;
  cursor: default;

  img {
    display: block;
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
}

.lang__select {
  display: flex;
  padding: 10px;
  padding-right: 30px;
  text-align: start;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  border: #252525 1px solid;
  border-radius: 4px;

  &::after {
    content: '';
    align-self: center;
    right: 7px;
    position: absolute;
    width: 20px;
    height: 20px;
    transition: all 0.4s ease;
    background: url('@/assets/svg/down-arrow.svg');
  }
}

.lang__options {
  width: 100%;
  position: absolute;
  bottom: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.lang__options > li {
  display: flex;
  align-items: center;
  padding: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  background-color: #232322;
  cursor: pointer;

  &:hover {
    background-color: #363635;
  }
}

.lang__options > li:nth-child(1) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.menu-active {
  &::after {
    transform: rotate(180deg);
  }

  border-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
