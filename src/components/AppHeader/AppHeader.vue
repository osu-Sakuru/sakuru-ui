<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ActionsBar from './ActionsBar/ActionsBar.vue';

const isScrolled = ref(false);
const scrollHandler = () =>
  window.scrollY > 0 ? (isScrolled.value = true) : (isScrolled.value = false);

onMounted(() => window.addEventListener('scroll', scrollHandler));
onUnmounted(() => window.removeEventListener('scroll', scrollHandler));
</script>

<template>
  <header class="fixed" :class="{ header__bg: isScrolled }">
    <div class="container">
      <div class="header__wrapper">
        <div class="navigation__wrapper">
          <a class="logo" href="#">
            <img src="@/assets/svg/logo.svg" alt="sakuru-logo" />
          </a>
          <nav>
            <ul class="nav__list">
              <li class="nav__link"><a href="#">{{ $t('navbar.leaderboards') }}</a></li>
              <li class="nav__link"><a href="#">{{ $t('navbar.clans') }}</a></li>
              <li class="nav__link"><a href="#">{{ $t('navbar.beatmaps') }}</a></li>
              <li class="nav__link"><a href="#">{{ $t('navbar.info') }}</a></li>
              <li class="nav__link"><a href="#">{{ $t('navbar.connect') }}</a></li>
            </ul>
          </nav>
        </div>
        <ActionsBar />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  z-index: 10;
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
  height: 84px;
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
