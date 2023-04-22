<script lang="ts" setup></script>

<template>
  <section class="contacts">
    <div class="container">
      <h2 class="contacts__title">{{ $t('meta.contacts.caption') }}</h2>
      <div class="contacts__links">
        <SocialButton iconName="discord" class="contacts__btn">
          {{ $t('meta.contacts.discord') }}
        </SocialButton>
        <SocialButton
          iconName="email"
          class="contacts__btn"
          href="mailto:team@sakuru.cc"
        >
          team@sakuru.cc
        </SocialButton>
        <SocialButton iconName="youtube" class="contacts__btn youtube">
          {{ $t('meta.contacts.youtube') }}
        </SocialButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contacts {
  position: relative;
  padding: 160px 0 205px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 800px;
    background: url('@/assets/svg/contacts-bg.svg') no-repeat center top;
  }
}

.contacts__title {
  margin-bottom: 32px;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
}

.contacts__links {
  display: flex;
  justify-content: space-between;
}

.contacts__btn {
  width: 420px;
  padding: 22px 82px;
  color: $main-hover;

  &:hover {
    color: #262626;
    background-color: $main-hover;
  }
}

.youtube {
  position: relative;
  color: #ff6969;

  &:hover {
    color: #262626;
    background-color: #ff6969;
  }
}
</style>
