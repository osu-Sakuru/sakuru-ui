<script setup lang="ts">
import NotificationErr from '../NotificationErr/NotificationErr.vue';

const emits = defineEmits(['close']);
const wat = 'asdasdas';
</script>

<template>
  <NotificationErr :errMsg="wat ? wat : ''" :onLeft="true" />
  <div @mouseover.stop @mouseout.stop @click="emits('close')" class="modal-bg">
    <div class="container">
      <div class="modal__wrapper" @click.stop>
        <form class="modal">
          <FormInput :name="'username'"></FormInput>
          <FormInput :forPasswd="true" :name="'password'"></FormInput>
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
</style>
