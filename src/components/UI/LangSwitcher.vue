<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LangSwitcher',
});
</script>

<script setup lang="ts">
import { ref } from 'vue';
import i18n from '@/i18n';

const langHashMap: Map<"ua" | "en", string> = new Map([
  ['ua', '🇺🇦 Ukrainian'],
  ['en', '🇺🇸 English'],
]);

const menuActive = ref(false);

const menuHandler = () => menuActive.value = !menuActive.value;
</script>

<template>
  <div
    @mouseover="menuHandler"
    @mouseout="menuHandler"
    class="lang__switcher"
  >
    <div  
      class="lang__select"
      :class="{ 'menu-active': menuActive }"
    >
      {{ langHashMap.get(i18n.global.locale.value) }}
    </div>
    <ul v-show="menuActive" class="lang__options">
      <li @click="i18n.global.locale.value = lang" v-for="[lang, value] in langHashMap.entries()" :key="lang">{{ value }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.lang__switcher {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  cursor: default;
}

.lang__select {
  width: 150px;
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
    transition: all 0.3s ease;
    background: url('@/assets/svg/down-arrow.svg');
  }
}

.lang__options {
  position: absolute;
  bottom: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.lang__options > li {
  width: 150px;
  padding: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  background-color: #232322;
  cursor: pointer;
}

.lang__options > li:nth-child(1) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.menu-active {
  border-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
