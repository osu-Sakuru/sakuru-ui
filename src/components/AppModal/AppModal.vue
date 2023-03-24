<script setup lang="ts">
import { ref } from 'vue';
import NotificationErr from '../NotificationErr/NotificationErr.vue';

const emits = defineEmits(['close']);
const suka = "ssawe;mafwlm;kfwelmfwkl;flkewm\nasdl,adas";

const showPass = ref(false);
const showPasshandler = () => {
  showPass.value = !showPass.value;
};
</script>

<template>
  <NotificationErr :errMsg="suka ? suka : ''" :onLeft="true" />
  <div @mouseover.stop @mouseout.stop @click="emits('close')" class="modal-bg">
    <div class="container">
      <div class="modal__wrapper" @click.stop>
        <form class="modal">
          <div class="modal__input">
            <label for="username">{{ $t('modal.username') }}</label>
            <input name="username" class="modal__input" type="text" />
          </div>
          <div class="modal__input">
            <label for="password">{{ $t('modal.password') }}</label>
            <input ref="passInput" name="password" class="modal__input" :type="showPass ? 'text' : 'password'" />
            <i @click="showPasshandler" :class="{ 'show-pass': showPass }"></i>
          </div>
          <div class="modal__btns-wrapper">
            <div class="btns">
              <img src="@/assets/svg/modal-hand.svg" alt="hand" />
              <span class="modal__sign-up">
                <span>{{ $t('modal.not_reg') }}</span>
                <a href="">{{ $t('modal.sign_up') }}</a>
              </span>
            </div>
            <button>login</button>
          </div>
          <a class="modal__forgot" href="">{{ $t('modal.forgot') }}</a>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 19;
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

.modal__input {
  position: relative;
  display: flex;
  width: 100%;
  height: 88px;
  margin-bottom: 8px;

  label {
    position: absolute;
    top: 18px;
    left: 32px;
    z-index: 1;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;

    color: $secondary;
  }

  input {
    padding: 37px 32px 18px;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    border: none;
    outline: none;
    background: #484848;
    color: #ffffff;
  }

  i {
    content: '';
    display: block;
    align-self: center;
    position: absolute;
    right: 20px;
    width: 24px;
    height: 24px;
    background: url('@/assets/svg/pass-eye-off.svg');
    cursor: pointer;
  }
}

.show-pass {
  background: url('@/assets/svg/pass-eye-on.svg') !important;
}

.modal__btns-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 8px 0 35px 0;
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
}
</style>
