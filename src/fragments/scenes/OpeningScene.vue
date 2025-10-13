<script setup>
import { computed, ref } from 'vue';
import TalkBox from '../../components/TalkBox.vue';
import { useGameLogic } from '../../composables/use-game-logic.js';

const { startGame } = useGameLogic();

const TEXTS = [
  '俺は通帳の残高を見て愕然とした、、、',
  '「なんで俺は、、、」',
  'わかっている、レンタル彼女なんかに本物の恋愛なんてないことは、、、',
  'すべての元凶はこの女だ、名前は「八村しずこ」',
  '認めたくないが、とても可愛い\nそしてその内面は優しく俺のことをいつも励ましてくれる。',
  '彼女との時間は本当に楽しい、一緒にいる時間は全てを忘れられる\n月々8800円だと思えば安いのかもしれない、、、',
  'でも俺は本当に自分と向き合ってくれるようなパートナーが欲しい、\nそう決断し俺は解約ページにまで進んだ'
]

const currentIndex = ref(0);
const currentText = computed(() => TEXTS[currentIndex.value]);

const next = () => {
  currentIndex.value = currentIndex.value + 1;
  if (currentIndex.value >= TEXTS.length) {
    // 全て表示し終わったらゲーム開始
    onStart();
  }
};

/**
 * ゲームを開始する
 * スタートボタンクリック時に呼ばれる
 */
function onStart() {
  startGame();
}
</script>

<template>
  <div class="opening-overlay" @click="next">
    <img class="photo" src="/img/kanojo/shizuko.png" alt="" :data-show="currentIndex >= 3">
    <TalkBox>
      {{ currentText }}
    </TalkBox>
  </div>
</template>

<style scoped>
.opening-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.photo {
  position: fixed;
  height: 100%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  opacity: 0;
}
.photo[data-show='true'] {
  opacity: 1;
  transition: opacity 1s ease-in;
}
</style>
