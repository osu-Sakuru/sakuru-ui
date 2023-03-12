<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<script setup lang="ts">
import HomeRecords from "@/components/HomeRecords/HomeRecords.vue";
import HomeContacts from "@/components/HomeContacts/HomeContacts.vue";
import { backendApi } from "@/main";

const serverStats = await (await backendApi.get("/server_stats")).data;

</script>

<template>
  <main>
    <!-- Hero -->
    <section class="hero__bg">
      <div class="container">
        <div class="hero__wrapper">
          <div class="hero">
            <span>{{ $t('unlogged_welcometo') }}</span>
            <h1>Sakuru.pw</h1>
            <h2>{{ $t('unlogged_welcometext') }}</h2>
          </div>
          <div class="hero__info">
            <div class="hero__stats">
              <ul class="hero__list">
                <li class="hero__item hero__item-1">
                  <span>{{ $t('unlogged_over') }}</span>
                  <h3>{{ serverStats.players_total }}+ {{ $t('unlogged_registered_players') }}</h3>
                </li>
                <li class="hero__item hero__item-2">
                  <span>{{ $t('unlogged_more_than') }}</span>
                  <h3>{{ serverStats.custom_ranked_maps_count }} {{ $t('unlogged_beatmaps_ranked') }}</h3>
                </li>
                <li class="hero__item hero__item-3">
                  <span>{{ $t('unlogged_friendly') }}</span>
                  <h3>{{ $t('unlogged_community') }}</h3>
                </li>
              </ul>
            </div>
            <div class="actions">
              <ActionButton
                :arrow="true"
                class="actions__register"
              >
                {{ $t('unlogged_action_button', { players_online: serverStats.players_online }) }}
              </ActionButton>
              <SocialButton 
                :iconUrl="`url('src/assets/svg/discord-icon.svg')`"
                class="actions__discord"
              >
                {{ $t('contacts_discord') }}
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
          <h2 class="features__title">{{ $t('unlogged_features') }}</h2>
          <ul class="features__list">
            <li class="features__item">
              <img src="@/assets/img/cards-1.jpg" alt="osu! direct">
              <h3>osu! direct</h3>
              <p>{{ $t('unlogged_directtext') }}</p>
            </li>
            <li class="features__item">
              <img src="@/assets/img/cards-2.jpg" alt="performance point system">
              <h3>{{ $t('unlogged_pp_systems') }}</h3>
              <p>{{ $t('unlogged_pp_systemstext') }}</p>
            </li>
            <li class="features__item">
              <img src="@/assets/img/cards-3.jpg" alt="leaderboards">
              <h3>{{ $t('unlogged_leaderboards') }}</h3>
              <p>{{ $t('unlogged_leaderboardstext') }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- Features end -->
    <!-- Player quotes -->
    <section class="player-quotes">
      <div class="container">
        <h2 class="player-quotes__title">{{ $t('unlogged_players_quotes') }}</h2>
        <ul class="player-quotes__list">
          <div>
            <li class="player-quotes__item player-quotes__item-1">
              <blockquote>{{ $t('unlogged_quote1') }}</blockquote>
              <div>
                <img src="@/assets/img/player-quote-sussymaster2003.png" alt="avatar">
                <span>sussymaster2003</span>
              </div>
            </li>
            <li class="player-quotes__item player-quotes__item-2">
              <blockquote v-html="$t('unlogged_quote2')"></blockquote>
              <div>
                <img src="@/assets/img/player-quote-juiinee.png" alt="avatar">
                <span>Juiinee</span>
              </div>
            </li>
          </div>
          <li style="position: relative;" class="player-quotes__item player-quotes__item-3">
            <blockquote v-html="$t('unlogged_quote3')"></blockquote>
            <div>
              <img src="@/assets/img/player-quote-magnatagamer123.png" alt="avatar">
              <span>magnatagamer123</span>
            </div>
            <ActionButton
              :arrow="true"
              class="player-quotes__btn"
            >
              {{ $t('unlogged_quote_action') }}
            </ActionButton>
          </li>
        </ul>
      </div>
    </section>
    <!-- Player quotes end -->
    <!-- PP Records -->
    <HomeRecords />
    <!-- PP Records end -->
    <HomeContacts />
  </main>
</template>

<style scoped lang="scss">

// Hero section
.hero__bg {
  position: relative;
  padding: 250px 0 75px 0;
  

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    background: url("@/assets/img/home-bg.jpg") no-repeat center top;
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
    color: #7E7E7E;
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
    background-color: #2F4771;

    &::after {
      content: "// stats";
      position: absolute;
      left: 0;
      top: 105%;
      font-style: normal;
      font-weight: 700;
      font-size: 48px;
      line-height: 66px;
      color: #2D2D2D;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 100%;
      width: 300px;
      height: 100%;
      background-color: inherit;
    }
  }

  .hero__item-2 {
    // width: 280px;
    background-color: #344F7F;
  }

  .hero__item-3 {
    max-width: 200px;
    background-color: #3C5B90;
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
    color: #9DBAEE;
    
    &:hover {
      background-color: #9DBAEE;
      color: #262626;
    }
  }
}

// Key Features
.features__bg {
  background: url("@/assets/svg/features-bg.svg") no-repeat center;
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
    color: #B5B5B5;
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

  .player-quotes__item {
    text-align: center;
    
    blockquote {
      margin: 0 0 21px 0;
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
    width: 660px;
    padding: 32px 188px;
    background-color: #3C5B90;

    &::before {
      content: "";
      position: absolute;
      right: 75%;
      bottom: -20%;
      z-index: -1;
      display: block;
      width: 287px;
      height: 249px;
      background: url("@/assets/svg/player-quotes-bg.svg") no-repeat;
    }
  }

  .player-quotes__item-2 {
    width: 660px;
    padding: 42px 97px;
    background-color: #2F4771;

    blockquote {
      font-style: italic;
      font-weight: 700;
      font-size: 18px;
      line-height: 150%;
    }
  }

  .player-quotes__item-3 {
    position: relative;
    padding: 100px;
    background-color: #344F7F;

    blockquote {
      margin-bottom: 32px;
    }

    &::before {
      content: "";
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
  }
}
</style>
