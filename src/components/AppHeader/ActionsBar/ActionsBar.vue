<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import type { VueCookies } from 'vue-cookies';
import AppModal from '@/components/AppModal/AppModal.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';

const userStore = useUserStore();
const router = useRouter();
const cookies = inject<VueCookies>('$cookies');

const userAvatar = userStore.isLoggedIn
  ? `https://a.${import.meta.env.VITE_APP_DOMAIN}/${userStore.user.id}`
  : `https://a.${import.meta.env.VITE_APP_DOMAIN}/default.jpg`;

const menuActive = ref(false);
const modalActive = ref(false);
const hover = ref(false);

const menuHandler = () => (menuActive.value = !menuActive.value);
const modalHandler = () => (modalActive.value = !modalActive.value);
const hoverHandler = () => (hover.value = !hover.value);

onMounted(() => {
  modalActive.value = false;
});

onUnmounted(() => {
  modalActive.value = false;
});
</script>

<template>
  <div class="actions__wrapper">
    <RouterLink to="/support" class="support__icon">
      <svg
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 10H5.625L6.875 8.125L9.375 11.875L10.625 10H12.5"
          stroke="white"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.19643 7.49949C2.19052 7.39587 2.18754 7.29187 2.1875 7.1875C2.18766 6.24854 2.51301 5.33862 3.10824 4.61243C3.70347 3.88625 4.53183 3.38863 5.45249 3.20417C6.37315 3.01972 7.32928 3.15982 8.15832 3.60065C8.98736 4.04148 9.63814 4.75584 10 5.62226L9.99999 5.62227C10.3619 4.75584 11.0126 4.04149 11.8417 3.60065C12.6707 3.15982 13.6268 3.01972 14.5475 3.20417C15.4682 3.38863 16.2965 3.88625 16.8918 4.61243C17.487 5.33862 17.8123 6.24854 17.8125 7.1875C17.8125 12.5 10 16.875 10 16.875C10 16.875 6.87932 15.1274 4.58262 12.5001"
          stroke="white"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </RouterLink>
    <SearchBar />
    <div
      @mouseover="menuHandler"
      @mouseout="menuHandler"
      v-if="userStore.isLoggedIn"
      class="actions__btn-wrapper"
    >
      <div>
        <button
          :class="{ 'menu-hover': menuActive }"
          class="btn actions__btn-account"
        >
          {{ userStore.user.name }}
        </button>
        <img class="actions__avatar" :src="userAvatar" alt="avatar" />
        <i
          :class="{ 'menu-hover': menuActive }"
          class="actions__account-icon"
        ></i>
        <ul v-show="menuActive" class="actions__btn-list searchbar__results">
          <!-- same as searching results, wait for marks design -->
          <li
            @click.prevent="
              userStore.logout();
              router.replace('/');
              cookies?.remove('token');
            "
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
    <div
      @mouseover="hoverHandler"
      @mouseout="hoverHandler"
      class="log__btn-wrapper"
      v-else
    >
      <button
        @click="modalHandler"
        :class="{ modalActive: modalActive, 'log__btn-hover': hover }"
        class="btn"
      >
        {{ $t('navbar.login') }}
      </button>
      <i
        @click="modalHandler"
        :class="{ modalActive: modalActive, 'log__btn-hover': hover }"
        class="log__icon"
      ></i>
      <AppModal :show="modalActive" @close="modalHandler" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions__wrapper {
  display: flex;
  align-items: center;

  .support__icon {
    margin-right: 70px;
    cursor: pointer;
    transform: translateY(3px);
    transition: all 0.3s ease;

    &:hover {
      svg > path {
        stroke: $main-hover;
        transition: all 0.3s ease;
      }
    }
  }

  .btn {
    position: relative;
    padding: 0;
    padding-right: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    border: none;
    background: transparent;
    color: $main;
    transition: all 0.3s ease;
  }

  .actions__btn-wrapper {
    position: relative;
  }

  .actions__btn-wrapper > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 35px;
  }

  .actions__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .actions__account-icon {
    &::after {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      background: url('@/assets/svg/down-arrow.svg');
      transition: transform 0.3s ease;
    }
  }

  .menu-hover {
    color: $main-hover;
    cursor: default;

    &::after {
      transform: rotate(180deg);
      background: url('@/assets/svg/down-arrow-hover.svg');
    }
  }

  .log__btn-wrapper {
    display: flex;
    align-items: center;
  }

  .log__icon {
    transform: translateY(1px);
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      background: url('@/assets/svg/login-icon.svg');
      transition: all 0.3s ease;
    }
  }

  .log__btn-hover {
    color: $main-hover;

    &::after {
      background: url('@/assets/svg/login-icon-hover.svg');
    }
  }

  .modalActive {
    position: relative;
    z-index: $zindex-ontop;
  }
}
</style>
