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
    <RouterLink to="/support" class="support-icon">
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
    <SearchBar v-if="userStore.isLoggedIn"></SearchBar>
    <div v-if="userStore.isLoggedIn" class="account-wrapper">
      <div>
        <img
          @click="menuHandler"
          class="account__avatar"
          :class="{ 'dropdown-active': menuActive }"
          :src="userAvatar"
          alt="avatar"
          draggable="false"
        />
        <div v-if="menuActive" @click="menuHandler" class="account__menu-bg"></div>
        <Transition name="fade">
          <div v-if="menuActive" class="account__menu-wrapper">
            <RouterLink to="/profile" class="account__menu-cover" href="">
              <img src="@/assets/svg/avatar-placeholder.svg" alt="" />
              <span>{{ userStore.user.name }}</span>
            </RouterLink>
            <ul class="account__menu-list">
              <li class="account__menu-item">
                <RouterLink to="/profile" class="menu-item-link">My profile</RouterLink>
              </li>
              <li class="account__menu-item">
                <RouterLink to="/friends" class="menu-item-link">Friends</RouterLink>
              </li>
              <li class="account__menu-item">
                <RouterLink to="/settings" class="menu-item-link">Settings</RouterLink>
              </li>
              <li class="account__menu-item">
                <button
                  @click.prevent="
                    userStore.logout();
                    router.replace('/');
                    cookies?.remove('token');
                  "
                  class="menu-item-link"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </Transition>
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
}

.support-icon {
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

.account-wrapper > div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

.account__btn {
  position: relative;
}

.account__avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 0 3px $main;
  }
}

.account__icon {
  &::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: url('@/assets/svg/down-arrow.svg');
    transition: transform 0.3s ease;
  }
}

.account__menu-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.account__menu-wrapper {
  position: absolute;
  top: calc(100% + 20px);
  right: 0;
  display: flex;
  padding: 10px;
  gap: 10px;
  background-color: $bg26;

  &::after {
    position: absolute;
    bottom: 100%;
    right: 20px;
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 15px;
    border-color: transparent transparent $bg26 transparent;
  }

  .account__menu-cover {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-decoration: none;
    outline-style: none;

    &::before {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      z-index: $zindex-dropdown;
      background: url('@/assets/img/homeloggedin-bg.jpg') center no-repeat;
      background-size: cover;
      filter: blur(0.7px) brightness(0.7);
    }

    & > img {
      display: block;
      width: 40px;
      margin-bottom: 10px;
      z-index: $zindex-dropdown;
    }

    & > span {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      color: $main;
      z-index: $zindex-dropdown;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.2);
    }
  }

  .account__menu-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;

    &:last-child {
      button {
        color: $red !important;

        &::after {
          background-color: $red !important;
        }
      }
    }

    .account__menu-item {
      &:hover {
        background-color: $bg33;
      }
      
      .menu-item-link {
        position: relative;
        display: flex;
        width: 100%;
        padding: 10px 20px;
        white-space: nowrap;
        text-align: left;
        text-decoration: none;
        font-style: normal;
        font-size: 18px;
        line-height: 24px;
        border: 0;
        outline: 0;
        background-color: transparent;
        color: $main;

        &::after {
          content: "";
          position: absolute;
          left: 5px;
          width: 3px;
          height: 50%;
          align-self: center;
          opacity: 0;
          background-color: $main;
          transition: opacity 0.2s ease;
        }

        &:hover::after {
          opacity: 1;
        }

        &:visited {
          outline-style: none;
        }
      }
    }
  }
}

.dropdown-active {
  box-shadow: inset 0 0 0 3px $main;
}

.menu-hover {
  color: $main-hover;
  cursor: default;

  &::after {
    // transform: rotate(180deg);
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
