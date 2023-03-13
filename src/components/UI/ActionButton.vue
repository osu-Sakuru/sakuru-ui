<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ActionButton',
});
</script>

<script setup lang="ts">
import { ref } from 'vue';

const isAnimate = ref(false);
const props = defineProps({
  arrow: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    required: true,
  },
});

console.log(props);
</script>

<template>
  <RouterLink
    :to="props.to"
    @mouseover="isAnimate = true"
    @mouseleave="isAnimate = false"
    :class="{ animate: isAnimate && props.arrow, arrow: props.arrow }"
    class="btn-action"
  >
    <slot></slot>
  </RouterLink>
</template>

<style lang="scss" scoped>
.btn-action {
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  text-align: start;
  outline: none;
  border: none;
  cursor: pointer;
  color: $main;
  background-color: #e00087;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    border-radius: 8px;
    background-color: #d6007f;
  }
}

.green {
  color: green;
}

.arrow {
  &::after {
    content: '';
    position: absolute;
    left: 30px;
    bottom: 20px;
    display: block;
    width: 46px;
    height: 20px;
    background: url('@/assets/svg/arrow.svg') no-repeat;
  }
}

.animate::after {
  animation: arrow 1.3s infinite;
  animation-timing-function: ease;
}

@keyframes arrow {
  0% {
    left: 30px;
  }

  50% {
    left: 40px;
  }

  100% {
    left: 30px;
  }
}
</style>
