<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SocialButton",
  props: {
    iconUrl: {
      type: String,
      required: true,
    },
    noHover: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    makeIconHover(iconUrl: string): string {
      // edits path to hover icon
      return this.noHover ? iconUrl : iconUrl.replace(".svg')", "-hover.svg')");
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
    content: "";
    position: absolute;
    left: 32px;
    align-self: center;
    display: block;
    width: 32px;
    height: 32px;
    background: v-bind(iconUrl) no-repeat;
    transition: all 0.3s ease;
  }

  &:hover::before {
    // v-bind variable should contain a string like "url('/path/to/img')"
    background: v-bind(makeIconHover(iconUrl)) no-repeat;
  }
}
</style>
