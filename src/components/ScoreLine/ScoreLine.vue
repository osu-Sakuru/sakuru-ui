<script setup lang="ts">
import { ref } from 'vue';

const rank = ref('SSs');
const name = ref('POMAH');
const rankNumber = ref(1);
const map = ref('Dick Dale and His Del-Tones - Misirlou [Surf time!]');
const mode = ref('osu!');
const time = ref(20);
</script>

<template>
  <div class="score-wrapper">
    <div class="score">
      <div class="score-rank"><span :class="`score-rank-${rank}`"></span></div>
      <div>
        <strong
          ><RouterLink to="/">{{ name }}</RouterLink></strong
        >
        achived rank #{{ rankNumber }} on
        <strong
          ><RouterLink to="/">{{ map }}</RouterLink></strong
        >
        ({{ mode }})
      </div>
    </div>
    <div class="score-timestamp">{{ time }} days ago</div>
  </div>
</template>

<style lang="scss" scoped>
.score-wrapper {
  display: flex;
  justify-content: space-between;
}

.score {
  display: flex;
  margin-right: 15px;
}

.score-rank {
  width: 47px;
  height: 27px;
}

// lowercase s means silver
.score-rank-SSs {
  background-image: url('@/assets/svg/ranks/ss-silver-rank.svg');
}

.score-rank-Ss {
  background-image: url('@/assets/svg/ranks/s-silver-rank.svg');
}

.score-rank-SS {
  background-image: url('@/assets/svg/ranks/ss-rank.svg');
}

.score-rank-S {
  background-image: url('@/assets/svg/ranks/s-rank.svg');
}

.score-rank-A {
  background-image: url('@/assets/svg/ranks/a-rank.svg');
}

.score-rank-B {
  background-image: url('@/assets/svg/ranks/b-rank.svg');
}

.score-rank-C {
  background-image: url('@/assets/svg/ranks/c-rank.svg');
}

.score-rank-D {
  background-image: url('@/assets/svg/ranks/d-rank.svg');
}

.score-rank-lose {
  background-image: url('@/assets/svg/ranks/lose-rank.svg');
}
</style>
