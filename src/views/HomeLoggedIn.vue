<script lang="ts" setup>
import { backendApi } from '@/main';
import { useUserStore } from '@/stores/user';

const { data: serverStats } = await backendApi.get('/statistics/server_stats');
// const streamers = await backendApi.get('/twitch/streamers');

const userStore = useUserStore();
</script>

<template>
  <section class="hero__bg">
    <div class="container">
      <div class="hero__wrapper">
        <div class="hero">
          <h1>{{ $t('home_loggedin.welcome') }} {{ userStore.user.name }}</h1>
        </div>
        <div class="hero__info">
          <div class="hero__stats">
            <ul class="hero__list">
              <li class="hero__item hero__item-1">
                <span>{{
                  $t('home_loggedin.online', serverStats.players_online)
                }}</span>
                <h3>
                  {{ serverStats.players_online }}
                  {{ $t('home_loggedin.players') }}
                </h3>
              </li>
              <li class="hero__item hero__item-2">
                <span>{{ $t('home_loggedin.lobbies') }}</span>
                <h3>{{ serverStats.multiplayer_matches }}</h3>
              </li>
              <li class="hero__item hero__item-3">
                <span>{{ $t('home_loggedin.streams') }}</span>
                <h3>{{ 228 }}</h3>
              </li>
            </ul>
          </div>
          <div class="actions">
            <SocialButton
              iconName="question"
              :noHover="true"
              class="actions__connect"
            >
              {{ $t('home_loggedin.connect_button') }}
            </SocialButton>
            <SocialButton iconName="discord" class="actions__discord">
              discord community
            </SocialButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Hero section
.hero__bg {
  position: relative;
  padding: 190px 0 75px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    background: url('@/assets/img/homeloggedin-bg.jpg') no-repeat center top;
    opacity: 15%;
  }
}

.hero {
  margin-bottom: 72px;

  h1 {
    margin: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 72px;
    line-height: 98px;
  }
}

.hero__info {
  display: flex;
  justify-content: space-between;
}

.hero__list {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  .hero__item {
    min-height: 94px;
    padding: 18px 32px;
    word-wrap: normal;

    span {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
      word-wrap: break-word;
    }

    h3 {
      margin: 0;
      font-style: normal;
      font-weight: 700;
      font-size: 23px;
      line-height: 33px;
      word-wrap: break-word;
    }
  }

  .hero__item-1 {
    position: relative;
    width: 200px;
    background-color: $tile-dark;

    &::after {
      content: '// stats';
      position: absolute;
      left: 0;
      top: 105%;
      font-style: normal;
      font-weight: 700;
      font-size: 48px;
      line-height: 66px;
      color: $black;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      width: 150%;
      height: 100%;
      background-color: inherit;
    }
  }

  .hero__item-2 {
    width: 280px;
    background-color: $tile-mid;
  }

  .hero__item-3 {
    width: 200px;
    background-color: $tile-bright;
  }
}

.actions {
  display: flex;
  flex-direction: column;

  .actions__connect {
    width: 540px;
    padding: 34px 82px;
    color: $main;
    background-color: $primary-btn;

    &:hover {
      border-radius: 8px;
      background-color: $primary-btn-hover;
    }
  }

  .actions__discord {
    padding: 22px 82px;
    color: $main-hover;

    &:hover {
      background-color: $main-hover;
      color: $bg26;
    }
  }
}
</style>
