<script setup lang="ts">
import { ref, type Ref } from 'vue';

const isSearching = ref(false);
const searchBar = ref<null | { focus: () => null, blur: () => null }>(null);

const searchingHandler = () => {
  // can't follow the link without timeout 
  setTimeout(() => {
    isSearching.value = !isSearching.value;
    if (isSearching.value) {
      searchBar.value?.focus();
    } else {
      searchBar.value?.blur();
    }
  }, 100);
};

const menuHandler = () => menuActive.value = !menuActive.value;

interface ISearchResult {
  id: number,
  value: string
}
  
const results: Ref<ISearchResult[]> = ref([]);

const mockArr = [
  { id: 2, value: "ladno" },
  { id: 2, value: "ladno" },
  { id: 2, value: "ladno" },
  { id: 2, value: "ladno" },
  { id: 2, value: "ladno" },
];

results.value.push(...mockArr); // mock

const isAuth = true;
const menuActive = ref(false);

</script>

<template>
  <div class="actions__wrapper">
    <a href="#" class="support__icon">
      <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 10H5.625L6.875 8.125L9.375 11.875L10.625 10H12.5" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.19643 7.49949C2.19052 7.39587 2.18754 7.29187 2.1875 7.1875C2.18766 6.24854 2.51301 5.33862 3.10824 4.61243C3.70347 3.88625 4.53183 3.38863 5.45249 3.20417C6.37315 3.01972 7.32928 3.15982 8.15832 3.60065C8.98736 4.04148 9.63814 4.75584 10 5.62226L9.99999 5.62227C10.3619 4.75584 11.0126 4.04149 11.8417 3.60065C12.6707 3.15982 13.6268 3.01972 14.5475 3.20417C15.4682 3.38863 16.2965 3.88625 16.8918 4.61243C17.487 5.33862 17.8123 6.24854 17.8125 7.1875C17.8125 12.5 10 16.875 10 16.875C10 16.875 6.87932 15.1274 4.58262 12.5001" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
    <div @click="searchingHandler" class="searchbox" :class="{ 'hover': !isSearching }">
      <form @submit.prevent class="searchbar__wrapper" :class="{ 'active': isSearching }" >
        <input @focusout="searchingHandler" ref="searchBar" @click.stop class="searchbar" type="text" placeholder="Start typing . . .">
        <ul class="searchbar__results">
          <li v-show="isSearching" v-for="result in results.slice(0, 5)" :key="result.id">
            <!-- TODO: finish with styling result -->
            <!-- idk how result supposed to look, i'll think about it later -->
            <a @click.stop href="https://google.com">
              {{ result.value }}
            </a>
          </li>
        </ul>
      </form>
    </div>
    <div 
      @mouseover="menuHandler" 
      @mouseout="menuHandler"
      v-if="isAuth" 
      class="actions__btn-wrapper"
    >
      <div >
        <button :class="{ 'menu-hover': menuActive }" class="btn actions__btn-account">Account</button>
        <img src="@/assets/svg/avatar-placeholder.svg" alt="avatar">
        <ul v-show="menuActive" class="actions__btn-list searchbar__results">
          <!-- same as searching results, wait for marks design -->
          <li>Suka</li>
        </ul>
      </div>
    </div>
    <button v-else class="btn log__icon">Login</button>
    <!-- TODO: add here a lang switcher -->
  </div>
</template>

<style lang="scss" scoped>
.actions__wrapper {
  display: flex;
  align-items: center;

  .support__icon {
    margin-right: 58px;
    cursor: pointer;
    transform: translateY(3px);
    transition: all 0.5 ease;

    &:hover {
      svg > path {
        stroke: $main-hover;
        transition: all 0.3s ease;
      }
    }
  }

  .searchbox {
    position: relative;
    margin-right: 24px;
    
    &::before {
      content: "Search";
      position: absolute;
      right: 43px;
      top: 9px;
      z-index: 11;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    &::after {
      content: "";
      position: absolute;
      right: 15px;
      top: 13px;
      z-index: 12;
      opacity: 100;
      width: 20px;
      height: 20px;
      cursor: pointer;
      background: url("@/assets/svg/search-icon-hover.svg") no-repeat;
      transition: all 0.3s ease;
    }
  }

  .searchbar__wrapper {
    position: relative;
    display: flex;
    width: 120px;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    background-color: #484848;
    transition: all 0.5s ease;
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
    
    ::placeholder {
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
    }
  }
  
  .active {
    width: 250px;
    opacity: 1;
    z-index: 12;
    pointer-events: all;
    border: solid 1px $main-hover;
  }

  .hover {
    &::after {
      background: url("@/assets/svg/search-icon.svg") no-repeat;
    }

    &:hover {
      color: $main-hover;
    }

    &:hover::after {
      background: url("@/assets/svg/search-icon-hover.svg") no-repeat;
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
      background-color: #484848;
      transition: all 0.1s ease;
      
      &:hover {
        background-color: #3e3e3e;
      }

      a {
        display: block;
        padding: 5px;
        text-decoration: none;
        color: $main;
      }
    }
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
  
  .actions__btn-wrapper {
    position: relative;
  }

  .actions__btn-wrapper > div {
    display: flex;
    justify-content: center;
    margin-right: 40px;
  }

  .actions__btn-account {
    margin-right: 10px;

    &::after {
      left: 130px;
      top: 6px;
      background: url("@/assets/svg/down-arrow.svg");
    }
  }
  
  .menu-hover {
    color: $main-hover;
    cursor: default;

    &::after {
      transform: rotate(180deg);
      background: url("@/assets/svg/down-arrow-hover.svg");
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