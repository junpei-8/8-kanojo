<script setup>
import { ref, computed } from 'vue';
import GirlfriendEndingImage1 from '../../assets/girlfriend/ending-1.png';
import GirlfriendEndingImage2 from '../../assets/girlfriend/ending-2.png';

const TEXTS = [
  `俺はついにしずこと別れることが出来た。\n正直未練がないかと言われると嘘になる。`,
  `でも俺は本当の彼女を作らないと。そう思って解約ページに進んだはずなのに\nなぜか解約ページから前に進まなかった気がする、、、`,
  `あれ、あそこにいるのは、、、`,
  '、、、しずこだ\n何度も見てきた姿だ、間違えるはずがない',
  'そうだ、しずこはレンタル彼女なんだ、他の男と歩いていても\nなんらおかしくない。その事実を認めるだけでも胸が苦しい。',
  'いや、なんなら一緒に歩いている男は本物の彼氏かもしれない。\nシュッとしていてスタイリッシュな人だ、俺なんかよりよっぽどお似合いだ。',
  '無意識に下唇を噛んでいる自分に気付き嫌気がさした。\nわかっている、俺への対応は嘘で虚像に過ぎないことぐらいは、、、',
  'もう俺は決別したんだ、レンタルではない本当に自分のことに\n向き合ってくれる恋人をつくるために、、、',
  'ありがとうしずこ、君と一緒にいた時間はとても楽しかった、\n決してお金も時間も無駄ではなかった俺は強がりではなく思っている',
  '小さく俺はそう呟いて、俺には似つかわしくないこの街を後にした、、、',
];

const currentIndex = ref(0);
const currentText = computed(() => TEXTS[currentIndex.value]);

const next = () => {
  currentIndex.value = currentIndex.value + 1;
};
</script>

<template>
  <div class="ending-overlay" @click="next">
    <img
      class="photo"
      :src="GirlfriendEndingImage1"
      alt=""
      :data-show="currentIndex >= 3"
    />
    <img
      class="photo"
      :src="GirlfriendEndingImage2"
      alt=""
      :data-show="currentIndex >= TEXTS.length"
    />
    <div class="talk-box" v-if="currentText">
      {{ currentText }}
    </div>
  </div>
</template>

<style scoped>
.ending-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9999;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.8;
}

.talk-box {
  position: absolute;
  bottom: 100px;
  left: 50%;
  width: 60%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 40px;
  border-radius: 12px;
  white-space: pre;
  text-align: left;
  max-width: 1000px;
}
.photo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  opacity: 0;
}
.photo[data-show='true'] {
  opacity: 1;
  transition: opacity 1s ease-in;
}
</style>
