<script setup lang="ts">
const props = defineProps({
  errMsg: {
    type: String,
    default: undefined,
  },
  onLeft: {
    type: Boolean,
    default: false,
  },
});

const side = props.onLeft ? '0' : 'auto';
const reverseAnimation = props.onLeft
  ? 'translateX(-200px)'
  : 'translateX(200px)';
</script>

<template>
  <div
    v-if="props.errMsg ? props.errMsg : undefined"
    class="notification__wrapper"
  >
    <div class="notification">
      {{ props.errMsg }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification__wrapper {
  position: absolute;
  top: 40px;
  right: 0;
  left: v-bind(side);
  z-index: 100;
  width: 400px;
  padding: 20px;
  background-color: #ff6969;
  animation: show ease;
  animation-duration: 0.5s;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

@keyframes show {
  from {
    opacity: 0;
    transform: v-bind(reverseAnimation);
  }
  to {
    opacity: 100;
  }
}
</style>
