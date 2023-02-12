<script setup lang="ts">

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
              <button class="actions__btn">register now in a few clicks!</button>
              <button class="actions__btn">discord community</button>
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
  align-items: center;
}

.hero__stats {

}

.hero__list {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  .hero__item {
    padding: 18px 32px;
    word-wrap: normal;
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
    padding: 18px 32px 50px 18px;
    background-color: #344F7F;
  }

  .item-3 {
    width: 200px;
    background-color: #3C5B90;
  }
}

</style>