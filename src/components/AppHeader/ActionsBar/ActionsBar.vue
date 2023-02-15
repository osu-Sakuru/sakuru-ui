<script setup lang="ts">
import { ref } from 'vue';

const isSearching = ref(false);
const searchBar = ref<null | { focus: () => null }>(null);

const searchingHandler = () => {
  isSearching.value = !isSearching.value;
  if (isSearching.value) {
    searchBar.value?.focus();
  }
};
</script>

<template>
  <div class="actions__wrapper">
    <a href="#" class="support__icon">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 10H5.625L6.875 8.125L9.375 11.875L10.625 10H12.5" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.19643 7.49949C2.19052 7.39587 2.18754 7.29187 2.1875 7.1875C2.18766 6.24854 2.51301 5.33862 3.10824 4.61243C3.70347 3.88625 4.53183 3.38863 5.45249 3.20417C6.37315 3.01972 7.32928 3.15982 8.15832 3.60065C8.98736 4.04148 9.63814 4.75584 10 5.62226L9.99999 5.62227C10.3619 4.75584 11.0126 4.04149 11.8417 3.60065C12.6707 3.15982 13.6268 3.01972 14.5475 3.20417C15.4682 3.38863 16.2965 3.88625 16.8918 4.61243C17.487 5.33862 17.8123 6.24854 17.8125 7.1875C17.8125 12.5 10 16.875 10 16.875C10 16.875 6.87932 15.1274 4.58262 12.5001" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
    <div :class="{'search-active': isSearching}" class="search__box">
      <span
        @click="searchingHandler"
        :class="{'inactive': isSearching, 'move': isSearching }" 
        class="text"
      >
        Search
      </span>
      <input
        @focusout="searchingHandler"
        :class="{'search-active': isSearching }"
        ref="searchBar"
        class="search__bar"
        placeholder="Start typing..."
      />
    </div>
    <button class="btn log__icon">Login</button>
  </div>
</template>

<style lang="scss" scoped>
.actions__wrapper {
  display: flex;
  align-items: center;

  .support__icon {
    margin-right: 58px;
    cursor: pointer;
    transform: translateY(4px);
    transition: all 0.5 ease;

    &:hover {
      svg > path {
        stroke: $main-hover;
        transition: all 0.3s ease;
      }
    }
  }

  .search__box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100px;
    height: 45px;
    margin-right: 60px;
    transition: all 0.4s ease;

    .text {
      position: absolute;
      right: 25px;
      z-index: 1;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      color: $main;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: $main-hover;
      }

      &::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 73px;
        z-index: 10;
        display: block;
        width: 20px;
        height: 20px;
        background: url("@/assets/svg/search-icon.svg") no-repeat;
        transition: all 0.3s ease;
      }

      &:hover::after {
        background: url("@/assets/svg/search-icon-hover.svg");
      }
    }
  }

  .search__bar {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    opacity: 0;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    outline: none;
    border: none;
    color: $main;
    background-color: #484848;
    transition: all 0.3s ease;

    &::placeholder {
      color: #B5B5B5;
    }
  }

  .search-active {
    z-index: 10;
    width: 230px;
    opacity: 100;
  }

  .btn {
    position: relative;
    padding: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    border: none;
    background: transparent;
    color: $main;
    transition: all 0.3s ease;

    &:hover {
      color: $main-hover;
    }

    &::after {
      content: "";
      position: absolute;
      top: 4px;
      width: 20px;
      height: 20px;
      transition: all 0.3s ease;
    }
  }

  .log__icon {
    margin-right: 30px;

    &::after {
      left: 60px;
      background: url("@/assets/svg/login-icon.svg");
    }

    &:hover::after {
      background: url("@/assets/svg/login-icon-hover.svg");
    }
  }
}
</style>