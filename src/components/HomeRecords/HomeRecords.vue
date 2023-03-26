<script setup lang="ts">
import { GameModes } from '@/enums/GameModes.enum';
import type { IServerRecords } from '@/interfaces/serverRecords.interface';
import { backendApi } from '@/main';

const { data: serverRecords } = await backendApi.get<IServerRecords>(
  '/statistics/server_records',
  {
    params: {
      'mode[]': [GameModes.VANILLA_OSU, GameModes.RELAX_OSU].join(','),
    },
  },
);

console.log(serverRecords);
</script>

<template>
  <section class="our-records">
    <div class="container">
      <h2 class="our-records__title">{{ $t('home_loggedout.records') }}</h2>
      <div class="our-records__scores">
        <RouterLink
          :to="'/u/3'"
          class="our-records__vanilla record-square"
          :style="{
            backgroundImage:
              'url(https://assets.ppy.sh/beatmaps/' +
              serverRecords[GameModes.VANILLA_OSU]?.set_id +
              '/covers/list@2x.jpg)',
          }"
        >
          <div>
            <h3>
              {{ serverRecords[GameModes.VANILLA_OSU]?.pp.toFixed(0) }} pp
            </h3>
            <RouterLink
              :to="'/u/' + serverRecords[GameModes.VANILLA_OSU]?.userid"
              >{{ $t('home_loggedout.records_setby') }}
              {{ serverRecords[GameModes.VANILLA_OSU]?.username }}</RouterLink
            >
          </div>
        </RouterLink>
        <RouterLink
          :to="'/u/3'"
          class="our-records__relax record-square"
          :style="{
            backgroundImage:
              'url(https://assets.ppy.sh/beatmaps/' +
              serverRecords[GameModes.RELAX_OSU]?.set_id +
              '/covers/list@2x.jpg)',
          }"
        >
          <div>
            <h3>{{ serverRecords[GameModes.RELAX_OSU]?.pp.toFixed(0) }} pp</h3>
            <RouterLink :to="'/u/' + serverRecords[GameModes.RELAX_OSU]?.userid"
              >{{ $t('home_loggedout.records_setby') }}
              {{ serverRecords[GameModes.RELAX_OSU]?.username }}</RouterLink
            >
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.our-records {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 0 75px 0;
  text-align: center;
}

.our-records__title {
  position: relative;
  margin-bottom: 54px;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 55px;

  &::before {
    content: '// #1s';
    position: absolute;
    left: -250px;
    top: 230px;
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 66px;
    color: #2d2d2d;
  }
}

.our-records__scores {
  display: flex;
  flex-direction: row;
}

.record-square {
  position: relative;
  display: flex;
  width: 400px;
  height: 400px;
  background-color: #555;
  text-align: left;
  text-decoration: none;
  color: $main;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: block;
    padding: 15px 35px;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    background-color: #e00087;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(248, 248, 249, 0) 100%
    );
  }

  div {
    align-self: flex-end;
    padding: 25px;
  }

  h3 {
    position: relative;
    z-index: 2;
    margin: 0 0 10px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 44px;
  }

  a {
    position: relative;
    z-index: 2;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    text-decoration: none;
    color: $main;
    transition: color 0.3s ease;

    &:hover {
      color: $main-hover;
    }
  }
}

.our-records__vanilla {
  // v-bind variable should contain a string like "url('/path/to/img')"
  margin-right: 42px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  // transform: scale(1.05);

  &::before {
    content: 'Vanilla';
  }
}

.our-records__relax {
  // v-bind variable should contain a string like "url('/path/to/img')"
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  &::before {
    content: 'Relax';
  }
}
</style>
