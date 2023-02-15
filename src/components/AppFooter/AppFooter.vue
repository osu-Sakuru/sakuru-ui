<script setup lang="ts">
</script>

<template>
  <footer class="footer">
      <div class="container">
        <div class="footer__content-wrapper">
          <ul class="footer__list">
            <li class="footer__item"><a href="">Links</a></li>
            <li class="footer__item"><a href="">Beatmaps</a></li>
            <li class="footer__item"><a href="">Connect</a></li>
            <li class="footer__item"><a href="">Discord server</a></li>
            <li class="footer__item"><a href="">YouTube channel</a></li>
            <li class="footer__item"><a href="">Leaderboards</a></li>
            <li class="footer__item"><a href="">Clans</a></li>
            <li class="footer__item"><a href="">Info</a></li>
            <li class="footer__item"><a href="">Email</a></li>
          </ul>
        <a class="footer__vote" href="">
          <img src="@/assets/img/topg.jpg" alt="topg.org">
        </a>
        </div>
      </div>
      <div class="footer__copyright">
        &copy; 2020-2021 Sakuru.pw is not affiliated with ppy Pty Ltd in any way. "osu!" is a trademark of ppy Pty Ltd.
      </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer__content-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 54px 0;
}

.footer__list {
  width: 60%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer__item {
  margin-right: 36px;  
  display: inline-block;

  a {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    text-decoration: none;
    color: $main-hover;
    transition: color 0.3s ease;

    &:hover {
      color: #B5B5B5;
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

.footer__copyright {
  text-align: center;
  padding: 48px 0;
  background-color: #151515;
}
</style>