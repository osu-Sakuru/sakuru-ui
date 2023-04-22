<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ActionsBar from './ActionsBar/ActionsBar.vue';

const currentStage = import.meta.env.VITE_APP_STAGE;
const isShow = ref(true);

const isScrolled = ref(false);
const scrollHandler = () =>
  window.scrollY > 0 ? (isScrolled.value = true) : (isScrolled.value = false);

const hideHeader = () => (isShow.value = false);
const showHeader = () => (isShow.value = true);

onMounted(() => {
  window.addEventListener('hideHeader', hideHeader);
  window.addEventListener('showHeader', showHeader);
  window.addEventListener('scroll', scrollHandler);
});
onUnmounted(() => {
  window.removeEventListener('hideHeader', hideHeader);
  window.removeEventListener('showHeader', showHeader);
  window.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <header v-if="isShow" class="fixed" :class="{ header__bg: isScrolled }">
    <div class="container">
      <div class="header__wrapper">
        <div class="navigation__wrapper">
          <AppLogo class="logo" />
          <nav>
            <ul class="nav__list">
              <li class="nav__link">
                <a href="#">{{ $t('navbar.leaderboards') }}</a>
              </li>
              <li class="nav__link">
                <a href="#">{{ $t('navbar.clans') }}</a>
              </li>
              <li class="nav__link">
                <a href="#">{{ $t('navbar.beatmaps') }}</a>
              </li>
              <li class="nav__link">
                <a href="#">{{ $t('navbar.info') }}</a>
              </li>
              <li class="nav__link">
                <a href="#">{{ $t('navbar.connect') }}</a>
              </li>
            </ul>
          </nav>
        </div>
        <ActionsBar />
      </div>
    </div>
    <div v-if="currentStage === 'PROD'" class="nav__attention">
      <p>
        This site is still under <b>heavy</b> development. Some features may not
        work correctly or may not exist at all, and some data may be incorrect.
      </p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav__attention {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: #d26f6f;
  font-style: normal;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
}

.fixed {
  position: fixed;
  z-index: $zindex-fixed;
  width: 100%;
  transition: all 0.3s ease-out;
}

.header__bg {
  background-color: #101010;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navigation__wrapper {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.logo {
  margin-right: 24px;
}

.nav__list {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;

  .nav__link:not(:last-child) {
    margin-right: 18px;
  }

  .nav__link > a {
    position: relative;
    padding: 5px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    text-decoration: none;
    color: $main;
    transition: all 0.3s ease;

    &:hover {
      color: $main-hover;
    }

    &::after {
      content: '';
      position: absolute;
      left: 5%;
      top: 95%;
      width: 90%;
      height: 2px;
      opacity: 0;
      background-color: $main-hover;
      transition: all 0.2s ease;
    }

    &:hover::after {
      opacity: 100;
    }
  }
}
</style>
