<script lang="ts">
export default {
  name: 'StepIcon',
};
</script>

<script setup lang="ts">
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <span class="icon">
    <i :class="{ 'bg-white': props.step >= 2 }" class="icon__circle"></i>
    <span>
      <i
        :class="{ 'bg-white': props.step >= 1 }"
        class="icon__circle margin"
      ></i>
      <i :class="{ 'bg-white': props.step == 3 }" class="icon__circle"></i>
    </span>
  </span>
</template>

<style lang="scss" scoped>
// TODO: clean up
.icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin: 0 24px 0 32px;

  span {
    display: flex;
    justify-content: center;
  }

  .icon__circle {
    width: 10px;
    height: 10px;
    border: solid 2px #ffffff;
    border-radius: 50%;
    transition: color 0.5s ease;
  }

  // .icon > i
  i:nth-child(1) {
    margin-bottom: 1px;
  }

  .margin {
    margin-right: 2px;
  }
}

.bg-white {
  background-color: #ffffff;
}
</style>
