<script setup lang="ts">
import { ref } from 'vue';

const isAnimate = ref(false);
</script>

<template>
  <main>
    <div class="bg">
      <div class="container">
        <div class="hero__wrapper">
          <div class="hero">
            <span>Welcome to</span>
            <h1>Sakuru.pw</h1>
            <h2>osu! server created for your joy</h2>
          </div>
          <div class="hero__info">
            <div class="hero__stats">
              <ul class="hero__list">
                <li class="hero__item item-1">
                  <span>over</span>
                  <h3>2300+ registered players</h3>
                </li>
                <li class="hero__item item-2">
                  <span>more than</span>
                  <h3>2000 much favored beatmaps ranked</h3>
                </li>
                <li class="hero__item item-3">
                  <span>friendly</span>
                  <h3>community and support team</h3>
                </li>
              </ul>
            </div>
            <div class="actions">
              <a 
                @mouseover="isAnimate = true"
                @mouseleave="isAnimate = false"
                :class="{ 'animate': isAnimate }" 
                class="actions__btn btn-register"
              >
                register now in a few clicks!
              </a>
              <a class="actions__btn btn-discord">discord community</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.bg {
  position: relative;

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

.hero__wrapper {
  padding: 250px 0 270px 0;
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
    height: 160px;
    padding: 18px 32px;
    word-wrap: normal;
    
    span {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
    }

    h3 {
      margin: 0;
      font-style: normal;
      font-weight: 700;
      font-size: 23px;
      line-height: 33px;
    }
  }

  .item-1 {
    position: relative;
    width: 200px;
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
      width: 330px;
      height: 100%;
      background-color: inherit;
    }
  }

  .item-2 {
    width: 280px;
    background-color: #344F7F;
  }

  .item-3 {
    width: 200px;
    background-color: #3C5B90;
  }
}

.actions {
  display: flex;
  flex-direction: column;

  .actions__btn {
    width: 540px;
  }
  
  .btn-register {
    position: relative;
    padding: 30px 230px 62px 32px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    text-align: start;
    outline: none;
    border: none;
    cursor: pointer;
    color: $main;
    background-color: #E00087;
    transition: all 0.3s ease;

    &::after {
      content: "";
      position: absolute;
      left: 30px;
      bottom: 20px;
      display: block;
      width: 46px;
      height: 20px;
      background: url("@/assets/svg/arrow.svg") no-repeat;
    }
  }

  .animate {
    border-radius: 8px;
  }

  .animate::after {
    animation: arrow 1.3s infinite;
    animation-timing-function: ease;
  }

  @keyframes arrow {
    0% {
      left: 30px;
    }

    50% {
      left: 40px;
    }

    100% {
      left: 30px;
    }
  }

  .btn-discord {
    position: relative;
    padding: 22px 82px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    background-color: #262626;
    color: #9DBAEE;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-radius: 8px;
      background-color: #9DBAEE;
      color: #262626;
    }

    &::before {
      content: "";
      position: absolute;
      left: 32px;
      bottom: 25px;
      display: block;
      width: 27px;
      height: 20px;
      background: url("@/assets/svg/discord.svg") no-repeat;
      transition: all 0.3s ease;
    }

    &:hover::before {
      background: url("@/assets/svg/discord-hover.svg") no-repeat;
    }
  }
}

</style>