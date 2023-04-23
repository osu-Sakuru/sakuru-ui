<script lang="ts">
import { buildIconURI } from '@/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SocialButton',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    noHover: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    getDefaultIcon(iconName: string): string {
      return buildIconURI(
        new URL(`/src/assets/svg/${iconName}-icon.svg`, import.meta.url).href,
      );
    },
    getHoverIcon(iconName: string): string {
      return buildIconURI(
        new URL(`/src/assets/svg/${iconName}-icon-hover.svg`, import.meta.url)
          .href,
      );
    },
    hoverOrNoHover(iconName: string): string {
      return this.noHover
        ? this.getDefaultIcon(iconName)
        : this.getHoverIcon(iconName);
    },
  },
});
</script>

<template>
  <a class="btn">
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
.btn {
  position: relative;
  display: flex;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: left;
  text-decoration: none;
  background-color: #262626;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-radius: 8px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 32px;
    align-self: center;
    display: block;
    width: 32px;
    height: 32px;
    background: v-bind(getDefaultIcon(iconName)) no-repeat;
    transition: all 0.3s ease;
  }

  &:hover::before {
    // v-bind variable should contain a string like "url('/path/to/img')"
    background: v-bind(hoverOrNoHover(iconName)) no-repeat;
  }
}
</style>
