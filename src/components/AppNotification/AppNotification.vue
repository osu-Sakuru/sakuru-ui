<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    // required: true,
  },
  message: {
    type: String,
    default: undefined,
  },
  floating: {
    type: Boolean,
    default: true,
  },
  onLeftSide: {
    type: Boolean,
    default: false,
  },
});

const side = props.onLeftSide ? '0' : 'auto';
const reverseAnimation = props.onLeftSide
  ? 'translateX(-200px)'
  : 'translateX(200px)';
</script>

<template>
  <div v-if="props.floating" class="notification__wrapper position">
    <div class="notification">
      {{ message }}
    </div>
  </div>
  <!-- different style based on floating prop -->
  <div v-else class="notification">
    <i></i>
    <span class="notification__text">
      <p>{{ message }}</p>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.position {
  position: absolute;
  top: 40px;
  right: 0;
  left: v-bind(side);
  z-index: $zindex-notification;
}

.notification__wrapper {
  width: 400px;
}

.notification {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  text-align: left;
  background-color: #DC7392;
  animation: show ease;
  animation-duration: 0.5s;
  
  i {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    background: url("@/assets/svg/notification-error.svg") no-repeat;
    background-size: contain;
  }

  &__text {
    h3 {
      margin: 0;
      padding: 0;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
    }

    p {
      margin: 0;
      padding: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 23px;
      margin-left: 10px;
    }
  }
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
