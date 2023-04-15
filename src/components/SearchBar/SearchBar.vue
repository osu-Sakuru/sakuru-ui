<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { backendApi } from '@/main';
import type { User } from '@/interfaces/user.interface';
import type { AxiosError, AxiosResponse } from 'axios';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const userAvatar = userStore.isLoggedIn
  ? `https://a.${import.meta.env.VITE_APP_DOMAIN}/${userStore.user.id}`
  : `https://a.${import.meta.env.VITE_APP_DOMAIN}/default.jpg`;

const isSearching = ref(false);
const hover = ref(false);
const searchBar = ref<null | { focus: () => null; blur: () => null }>(null);

const searchingHandler = () => {
  // can't follow the link without timeout
  setTimeout(() => {
    isSearching.value = !isSearching.value;
    if (isSearching.value) {
      searchBar.value?.focus();
    }
  }, 100);
};

const results: Ref<User[]> = ref([]);
const currentTimeout = ref<null | number>(null);

const search = (query: string) => {
  if (currentTimeout.value) return;

  if (query.length < 3) {
    results.value = [];
    return;
  }

  currentTimeout.value = setTimeout(() => {
    backendApi
      .get('/users/search', {
        params: {
          query: query,
          limit: 10,
        },
      })
      .catch((reason: AxiosError<User[]>) => {
        results.value = [];
        return reason.response!;
      })
      .then((response: AxiosResponse<User[]>) => {
        results.value = response.data;
      })
      .finally(() => {
        currentTimeout.value = null;
      });
  }, 350);
};
</script>

<template>
  <div @mouseover="hover = true" @mouseout="hover = false" class="searchbox">
    <div @click="searchingHandler" class="search__button-wrapper">
      <button class="search__button" :class="{ hover: hover }">
        {{ $t('navbar.search') }}
      </button>
      <i class="search__icon" :class="{ hover: hover || isSearching }"></i>
    </div>
    <form
      @submit.prevent
      class="searchbar__wrapper"
      :class="{ active: isSearching }"
    >
      <label class="search__icon hover pos"></label>
      <input
        @focusout="
          searchingHandler();
          hover = false;
          ($event.target as HTMLInputElement).value = '';
        "
        @click.stop
        @input="search(($event.target as HTMLInputElement).value)"
        ref="searchBar"
        class="searchbar"
        type="text"
        placeholder="Start typing..."
      />
      <ul class="searchbar__results">
        <li
          v-show="isSearching && results.length > 0"
          v-for="result in results"
          :key="result.id"
          @click="results = []"
        >
          <RouterLink :to="'/users/' + result.id">
            <img :src="userAvatar" />
            {{ result.name }}
          </RouterLink>
        </li>
      </ul>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.searchbox {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.search__button-wrapper {
  position: absolute;
  right: 11.5px;
  display: flex;
}

.search__button {
  padding: 0 10px 0 0;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search__icon {
  display: flex;
  align-items: center;

  &::after {
    content: '';
    right: 10px;
    opacity: 100;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url('@/assets/svg/search-icon.svg') no-repeat;
    transform: translateY(1px);
    transition: all 0.3s ease;
  }
}

.searchbar__wrapper {
  position: relative;
  // position: absolute;
  display: flex;
  width: 100px;
  opacity: 0;
  pointer-events: none;
  background-color: #484848;
  transition: width 0.6s ease, opacity 0.2s ease;
}

.searchbar {
  width: 100%;
  padding: 10px 45px 10px 10px;
  font-style: normal;
  font-weight: 400;
  border: none;
  outline: none;
  color: $main;
  background: transparent;
  transition: all 0.5s ease;

  &::placeholder {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 33px;
  }
}

.active {
  width: 250px;
  opacity: 1;
  z-index: $zindex-dropdown;
  pointer-events: all;
  border: solid 1px $main-hover;
}

.hover {
  color: $main-hover;

  &::after {
    background: url('@/assets/svg/search-icon-hover.svg') no-repeat;
  }
}

.searchbar__results {
  position: absolute;
  top: 102%;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: beige;

  li {
    display: flex;
    align-items: center;
    background-color: #484848;
    transition: all 0.1s ease;

    &:hover {
      background-color: #3e3e3e;
    }

    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 5px;
      text-decoration: none;
      color: $main;

      img {
        display: block;
        width: 35px;
        height: 35px;
        margin-right: 10px;
        border-radius: 5px;
      }
    }
  }
}

.pos {
  &::after {
    position: absolute;
  }
}
</style>
