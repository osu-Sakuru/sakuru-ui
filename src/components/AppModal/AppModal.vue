<script setup lang="ts">
import { ref } from 'vue';
import AppNotification from '@/components/AppNotification/AppNotification.vue';
import { NotificatonTypes, type Error } from '../../interfaces/error.interface';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const errors = ref<Error[]>([]);
const router = useRouter();

const emits = defineEmits(['close']);
const props = defineProps({
  show: Boolean,
});

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  const res = await userStore.login(username.value, password.value);
  if (!res) {
    emits('close');
    router.push('/home');
  } else {
    if (res.response)
      errors.value.push({
        message: res.response.data.message,
        label: 'Re-check your credentials.',
        type: NotificatonTypes.ERROR,
      });
  }
};
// watch(username, (newUsername) => {
//   console.log(newUsername);

//   if (newUsername.length < 3) {
//     errors.value.push({
//       message: 'Username must be at least 3 characters.',
//       label: 'Wrong username.',
//       type: NotificatonTypes.ERROR,
//     });
//   } else {
//     errors.value = errors.value.filter(
//       (err) => err.message !== 'Username must be at least 3 characters.',
//     );
//   }

//   return true;
// });
</script>

<template>
  <AppNotification
    v-for="error of errors"
    :message="error.message"
    :onLeftSide="true"
    :key="error.message"
  />
  <Transition name="fade">
    <div
      v-if="props.show"
      @mouseover.stop
      @mouseout.stop
      @click="emits('close')"
      class="modal-bg"
    >
      <div class="container">
        <div class="modal__wrapper" @click.stop>
          <form class="modal">
            <FormInput v-model="username" :name="'username'"></FormInput>
            <FormInput
              v-model="password"
              :forPasswd="true"
              :name="'password'"
            ></FormInput>
            <div class="modal__btns-wrapper">
              <div class="btns">
                <img src="@/assets/svg/modal-hand.svg" alt="hand" />
                <span class="modal__sign-up">
                  <span>{{ $t('modal.not_reg') }}</span>
                  <RouterLink @click="emits('close')" to="/register">{{
                    $t('modal.sign_up')
                  }}</RouterLink>
                </span>
              </div>
              <button @click.prevent="handleLogin">
                {{ $t('modal.login_btn') }}
              </button>
            </div>
            <RouterLink
              @click="emits('close')"
              class="modal__forgot"
              to="/forgot"
            >
              {{ $t('modal.forgot') }}</RouterLink
            >
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: $zindex-modal;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__wrapper {
  width: 540px;
  background-color: #262626;
  padding: 5px;
  margin-top: 90px;
  margin-left: auto;

  button {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 32px 0 67px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    border: none;
    outline: none;
    color: #ffffff;
    background-color: #e00087;
    transition: background-color 0.3s ease;

    &:hover {
      background: #f10090;
    }

    &::after {
      content: '';
      display: block;
      left: 24px;
      position: absolute;
      width: 32px;
      height: 32px;
      background: url('@/assets/svg/modal-arrow.svg');
    }
  }
}

.modal {
  padding: 10px;
  border: 2px solid #373737;
  border-radius: 4px;
  text-align: center;
}

.modal__btns-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 8px 0 35px;
}

.btns {
  display: flex;
  padding: 18px 32px;

  img {
    margin-right: 24px;
  }
}

.modal__sign-up {
  display: flex;
  flex-direction: column;
  text-align: left;

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    color: $secondary;
  }

  a {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    text-decoration: none;
    color: $main-hover;
    transition: color 0.3s ease;

    &:hover {
      color: $secondary;
    }
  }
}

.modal__forgot {
  margin-top: 35px;
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-decoration: none;
  color: $main-hover;
  transition: color 0.3s ease;

  &:hover {
    color: $secondary;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition-delay: 0.15s;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

// animation for modal__wrapper
.fade-enter-active .modal__wrapper,
.fade-leave-active .modal__wrapper {
  transition: all 0.3s ease-in-out;
}

.fade-enter-active .modal__wrapper {
  transition-delay: 0.15s; // delay before modal__wrapper appear
}

.fade-enter-from .modal__wrapper,
.fade-leave-to .modal__wrapper {
  transform: translateY(30px);
  opacity: 0.001;
}
</style>
