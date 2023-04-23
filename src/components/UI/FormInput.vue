<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FormInput',
  emits: ['update:modelValue'],
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
  modelValue: String,
});

const showPass = ref(false);
const isAnimate = ref(false);
const input = ref<HTMLInputElement>();

props.modelValue === '' ? (isAnimate.value = false) : (isAnimate.value = true);

const showPasshandler = () => {
  showPass.value = !showPass.value;
};

const animatePlaceholder = () => {
  if (input.value?.value.length == 0) {
    isAnimate.value = !isAnimate.value;
  }
};
</script>

<template>
  <div class="form__input">
    <input
      v-if="!props.forPasswd"
      @focus="animatePlaceholder"
      @focusout="animatePlaceholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :name="props.name"
      :value="props.modelValue"
      type="text"
      ref="input"
    />
    <input
      v-if="props.forPasswd"
      @focus="animatePlaceholder"
      @focusout="animatePlaceholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :name="props.name"
      :value="props.modelValue"
      :type="showPass ? 'text' : 'password'"
      ref="input"
    />
    <label :class="{ animate: isAnimate }" :for="props.name">{{
      $t(`modal.${props.name}`)
    }}</label>
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
    top: 28px;
    left: 32px;
    z-index: $zindex-dropdown;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: $secondary;
    transition: all 0.3s ease-out;
    pointer-events: none;
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
    background: $bg48;
    color: $main;
  }

  .animate {
    top: 18px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
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
