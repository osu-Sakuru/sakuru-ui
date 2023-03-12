<script lang="ts" setup></script>

<template>
  <section class="contacts">
    <div class="container">
      <h2 class="contacts__title">{{ $t('contacts') }}</h2>
      <div class="contacts__links">
        <SocialButton
          :iconUrl="'url(\'src/assets/svg/discord-icon.svg\')'"
          class="contacts__btn"
        >
          {{ $t('contacts_discord') }}
        </SocialButton>
        <SocialButton
          :iconUrl="'url(\'src/assets/svg/email-icon.svg\')'"
          class="contacts__btn"
          href="mailto:team@sakuru.pw"
        >
          team@sakuru.pw
        </SocialButton>
        <SocialButton
          :iconUrl="'url(\'src/assets/svg/youtube-icon.svg\')'"
          class="contacts__btn youtube"
        >
          {{ $t('contacts_youtube') }}
        </SocialButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contacts {
  position: relative;
  padding: 160px 0 205px 0;

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
