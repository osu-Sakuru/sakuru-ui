<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: "LangSwitcher",
});
</script>

<script setup lang="ts">
import { ref } from 'vue';

const pageLang = ref("en");
const menuActive = ref(false);

const langChanger = (lang: string) => {
  pageLang.value = lang;
  console.log(pageLang.value);
};

const menuHandler = () => {
  menuActive.value = !menuActive.value;
};

</script>

<template>
  <div 
    @mouseover="menuHandler"
    @mouseout="menuHandler"
    :class="{ 'menu-active': menuActive }"
    class="lang__switcher"
  >
    <div class="lang__select">{{ pageLang }}</div>
      <ul v-show="menuActive" class="lang__options">
        <li @click="langChanger('en')">en</li>
        <li @click="langChanger('ua')">ua</li>
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
  padding: 10px;
}

.lang__options {
  position: absolute;
  top: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.lang__options > li {
  padding: 10px;
  background-color: #232322;
  cursor: pointer;
}

.menu-active {
  background-color: #232322
};
</style>