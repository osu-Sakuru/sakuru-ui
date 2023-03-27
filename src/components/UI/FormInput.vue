<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FormInput',
});
</script>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  forPasswd: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
    required: true,
  },
});

const showPass = ref(false);
const showPasshandler = () => {
  showPass.value = !showPass.value;
};
</script>

<template>
  <div class="form__input">
    <label :for="props.name">{{ $t(`modal.${props.name}`) }}</label>
    <input v-if="!props.forPasswd" :name="props.name" type="text" />
    <input
      v-if="props.forPasswd"
      :name="props.name"
      :type="showPass ? 'text' : 'password'"
    />
    <i
      v-if="props.forPasswd"
      @click="showPasshandler"
      :class="{ 'show-pass': showPass }"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
.form__input {
  position: relative;
  display: flex;
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
    width: 100%;
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
</style>
