<script setup lang="ts">
import HomeRecords from '@/components/HomeRecords/HomeRecords.vue';
import HomeContacts from '@/components/HomeContacts/HomeContacts.vue';
import { backendApi } from '@/main';

const { data: serverStats } = await backendApi.get('/statistics/server_stats');
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="hero__bg">
      <div class="container">
        <div class="hero__wrapper">
          <div class="hero">
            <span>{{ $t('home_loggedout.welcome') }}</span>
            <h1>Sakuru</h1>
            <h2>{{ $t('home_loggedout.welcome_text') }}</h2>
          </div>
          <div class="hero__info">
            <div class="hero__stats">
              <ul class="hero__list">
                <li class="hero__item hero__item-1">
                  <span>{{ $t('home_loggedout.over') }}</span>
                  <h3>
                    {{
                      $t('home_loggedout.registered_players', {
                        players_registered: serverStats.players_total,
                      })
                    }}
                  </h3>
                </li>
                <li class="hero__item hero__item-2">
                  <span>{{ $t('home_loggedout.more_than') }}</span>
                  <h3>
                    {{
                      $t('home_loggedout.beatmaps_ranked', {
                        beatmaps_ranked: serverStats.custom_ranked_maps_count,
                      })
                    }}
                  </h3>
                </li>
                <li class="hero__item hero__item-3">
                  <span>{{ $t('home_loggedout.friendly') }}</span>
                  <h3>{{ $t('home_loggedout.community') }}</h3>
                </li>
              </ul>
            </div>
            <div class="actions">
              <ActionButton
                to="/register"
                :arrow="true"
                class="actions__register"
              >
                {{
                  $t('home_loggedout.action_button', {
                    players_online: serverStats.players_online,
                  })
                }}
              </ActionButton>
              <SocialButton iconName="discord" class="actions__discord">
                {{ $t('meta.contacts.discord') }}
              </SocialButton>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero end -->
    <!-- Features -->
    <section class="features__bg">
      <div class="features">
        <div class="container">
          <h2 class="features__title">{{ $t('home_loggedout.features') }}</h2>
          <ul class="features__list">
            <li class="features__item">
              <img src="@/assets/img/cards-1.jpg" alt="osu! direct" />
              <h3>osu! direct</h3>
              <p>{{ $t('home_loggedout.direct_text') }}</p>
            </li>
            <li class="features__item">
              <img
                src="@/assets/img/cards-2.jpg"
                alt="performance point system"
              />
              <h3>{{ $t('home_loggedout.pp_systems') }}</h3>
              <p>{{ $t('home_loggedout.pp_systems_text') }}</p>
            </li>
            <li class="features__item">
              <img src="@/assets/img/cards-3.jpg" alt="leaderboards" />
              <h3>{{ $t('home_loggedout.leaderboards') }}</h3>
              <p>{{ $t('home_loggedout.leaderboards_text') }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- Features end -->
    <!-- Player quotes -->
    <section class="player-quotes">
      <div class="container">
        <h2 class="player-quotes__title">
          {{ $t('home_loggedout.players_quotes') }}
        </h2>
        <ul class="player-quotes__list">
          <div>
            <li class="player-quotes__item player-quotes__item-1">
              <blockquote>
                community is as good as the server itself. The server owner is
                one of the best I know. Now back with a more refreshing design.
                I can hardly wait to play it again after such a long
                time.3333333333
              </blockquote>
              <div>
                <img
                  src="@/assets/img/player-quote-sussymaster2003.png"
                  alt="avatar"
                />
                <span>YumiNee</span>
              </div>
            </li>
            <li class="player-quotes__item player-quotes__item-2">
              <blockquote>
                community is as good as the server itself. The server owner is
                one of the best I know. Now back with a more refreshing design.
                I can hardly wait to play it again after such a long
                time.3333333333
              </blockquote>
              <div>
                <img src="@/assets/img/player-quote-juiinee.png" alt="avatar" />
                <span>YumiNee</span>
              </div>
            </li>
          </div>
          <li
            style="position: relative"
            class="player-quotes__item player-quotes__item-3"
          >
            <blockquote>
              Sakuru, the private server that has a place in my heart. The
              community is as good as the server itself. The server owner is one
              of the best I know. Now back with a more refreshing design. I can
              hardly wait to play it again after such a long time.3333333333
            </blockquote>
            <div>
              <img
                src="@/assets/img/player-quote-magnatagamer123.png"
                alt="avatar"
              />
              <span>YumiNee</span>
            </div>
            <ActionButton
              to="/register"
              :arrow="true"
              class="player-quotes__btn"
            >
              {{ $t('home_loggedout.quote_action') }}
            </ActionButton>
          </li>
        </ul>
      </div>
    </section>
    <!-- Player quotes end -->
    <HomeRecords />
    <HomeContacts />
  </main>
</template>

<style scoped lang="scss">
// Hero section
.hero__bg {
  position: relative;
  padding: 250px 0 75px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    background: url('@/assets/img/home-bg.jpg') no-repeat center top;
    opacity: 15%;
  }
}

.hero {
  text-align: center;
  margin-bottom: 200px;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: $grey;
  }

  h1 {
    margin: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 72px;
    line-height: 98px;
  }

  h2 {
    margin: 0;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
  }
}

.hero__info {
  display: flex;
}

.hero__stats {
  margin-right: 90px;
}

.hero__list {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  .hero__item {
    min-height: 160px;
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
    max-width: 260px;
    background-color: $tile-bright;

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
      width: 300px;
      height: 100%;
      background-color: inherit;
    }
  }

  .hero__item-2 {
    background-color: $tile-mid;
  }

  .hero__item-3 {
    max-width: 200px;
    background-color: $tile-dark;
  }
}

.actions {
  display: flex;
  flex-direction: column;

  .actions__register {
    padding: 30px 240px 62px 32px;
    min-height: 160px;
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

// Key Features
.features__bg {
  background: url('@/assets/svg/block-bg-1.svg') no-repeat center;
  padding: 75px 0;
}

.features__title {
  margin-bottom: 54px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 55px;
}

.features__list {
  display: flex;
  justify-content: space-between;
  padding: 0;
  list-style: none;
}

.features__item {
  width: 407px;

  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    color: $secondary;
  }
}

// Player quotes section
.player-quotes {
  padding: 75px 0;
}

.player-quotes__title {
  margin-bottom: 80px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 55px;
}

.player-quotes__list {
  display: flex;
  padding: 0;
  list-style: none;

  & > div {
    width: 50%;
  }

  .player-quotes__item {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    blockquote {
      margin: 0 0 21px;
      font-style: italic;
      font-weight: 700;
      font-size: 24px;
      line-height: 150%;
    }

    div {
      display: flex;
      justify-content: center;

      span {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 150%;
        color: $main-hover;
      }

      img {
        margin-right: 12px;
        border-radius: 4px;
        transform: translateY(-3px);
      }
    }
  }

  .player-quotes__item-1 {
    position: relative;
    height: 50%;
    padding: 42px 97px;
    background-color: $tile-bright;

    blockquote {
      font-style: italic;
      font-weight: 700;
      font-size: 18px;
      line-height: 150%;
    }

    &::before {
      content: '';
      position: absolute;
      right: 75%;
      top: -70px;
      z-index: -1;
      display: block;
      width: 287px;
      height: 249px;
      background: url('@/assets/svg/player-quotes-bg.svg') no-repeat;
    }
  }

  .player-quotes__item-2 {
    height: 50%;
    padding: 42px 97px;
    background-color: $tile-dark;

    blockquote {
      font-style: italic;
      font-weight: 700;
      font-size: 18px;
      line-height: 150%;
    }
  }

  .player-quotes__item-3 {
    position: relative;
    width: 50%;
    padding: 100px;
    background-color: $tile-mid;

    blockquote {
      margin-bottom: 32px;
    }

    &::before {
      content: '';
      position: absolute;
      padding: 0;
      top: 0;
      left: 100%;
      width: 340px;
      height: 100%;
      background-color: inherit;
    }
  }

  .player-quotes__btn {
    position: absolute;
    top: 90%;
    left: 20%;
    width: 80%;
    padding: 30px 0 52px 28px;
  }
}
</style>
