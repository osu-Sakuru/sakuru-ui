<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isShow = ref(true);

const hideFooter = () => (isShow.value = false);
const showFooter = () => (isShow.value = true);

onMounted(() => {
  window.addEventListener('hideFooter', hideFooter);
  window.addEventListener('showFooter', showFooter);
});
onUnmounted(() => {
  window.removeEventListener('hideFooter', hideFooter);
  window.removeEventListener('showFooter', showFooter);
});
</script>

<template>
  <footer v-if="isShow" class="footer">
    <div class="container">
      <div class="footer__content-wrapper">
        <div>
          <ul class="footer__list">
            <li class="footer__item">
              <a href="">{{ $t('footer.links') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.beatmaps') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.connect') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.discord') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.youtube') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.leaderboards') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.clans') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.info') }}</a>
            </li>
            <li class="footer__item">
              <a href="">{{ $t('footer.email') }}</a>
            </li>
          </ul>
        </div>
        <a class="footer__vote" href="">
          <img src="@/assets/img/topg.jpg" alt="topg.org" />
        </a>
      </div>
    </div>
    <div class="footer__copyright-bg">
      <div class="container">
        <div class="footer__copyright">
          <div>
            &copy; 2020-{{ new Date().getFullYear() }} Sakuru.cc is not
            affiliated with ppy Pty Ltd in any way. "osu!" is a trademark of ppy
            Pty Ltd.
          </div>
          <LangSwitcher />
        </div>
        <span
          v-html="$t('meta.recaptcha.agreement')"
          class="footer__captcha_agreement"
        >
        </span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer__content-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 54px 0;

  div {
    width: 70%;
  }
}

.footer__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer__item {
  padding-bottom: 10px;

  a {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    text-decoration: none;
    color: $main-hover;
    transition: color 0.3s ease;

    &:hover {
      color: $secondary;
    }
  }
}

.footer__item:nth-child(1) {
  margin-right: 109px;
}

.footer__vote {
  width: 88px;
  height: 31px;
}

.footer__copyright-bg {
  padding: 48px 0;
  background-color: $bg15;
}

.footer__copyright {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
