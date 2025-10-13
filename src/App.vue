<script setup>
import { computed } from 'vue';
import { useGameLogic } from './composables/use-game-logic.js';
import BrokenGlass from './fragments/anomalies/BrokenGlass.vue';
import Calling from './fragments/anomalies/Calling.vue';
import Comment from './fragments/anomalies/Comment.vue';
import MojiBake from './fragments/anomalies/MojiBake.vue';
import EndingScene from './fragments/scenes/EndingScene.vue';
import OpeningScene from './fragments/scenes/OpeningScene.vue';
import GameFooter from './fragments/sections/GameFooter.vue';
import KeyVisual from './fragments/sections/KeyVisual.vue';
import OtherKanojoSection from './fragments/sections/OtherKanojoSection.vue';
import ReasonSection from './fragments/sections/ReasonSection.vue';
import { gameState } from './store/game-store.js';

const { handleAnswer, startRound } = useGameLogic();

/**
 * 最終ステージ（8回目）かどうか。
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const isLastStage = computed(() => gameState.value.currentStage === 7);

/**
 * GameFooterのモード（異変に応じて変化）
 *
 * @type {import('vue').ComputedRef<string>}
 */
const footerMode = computed(() => {
  switch (gameState.value.currentAnomaly) {
    case 'buttonDodge':
      return 'dodge';
    case 'windowSpam':
      return 'window-spam';
    default:
      return '';
  }
});

/**
 * 戻るボタンのクリックハンドラー。
 * ページトップにスクロールしてから処理を実行。
 */
function onGoBack() {
  window.scrollTo(0, 0);
  handleAnswer(true);
}

/**
 * 進むボタンのクリックハンドラー。
 * ページトップにスクロールしてから処理を実行。
 */
function onProceed() {
  window.scrollTo(0, 0);
  handleAnswer(false);
}
</script>

<template>
  <!-- オープニングシーン -->
  <OpeningScene v-if="!gameState.gameStarted" />

  <!-- エンディングシーン -->
  <EndingScene v-if="gameState.isCleared" />

  <!-- ゲーム画面 -->
  <div class="game-view" v-if="gameState.gameStarted">
    <!-- ゲーム画面 -->
    <div class="game-content">
      {{ gameState.currentAnomaly }}

      <KeyVisual />

      <ReasonSection />

      <OtherKanojoSection
        :is-anomaly="gameState.currentAnomaly === 'otherKanojos'"
      />
      <BrokenGlass v-if="gameState.currentAnomaly === 'broken'" />

      <Calling v-if="gameState.currentAnomaly === 'calling'" />

      <MojiBake v-if="gameState.currentAnomaly === 'mojibake'" />

      <Comment v-if="gameState.currentAnomaly === 'comment'" />

      <GameFooter
        :is-last-stage="isLastStage"
        :mode="footerMode"
        :progress="((isLastStage ? 8 : gameState.currentStage) / 8) * 100"
        :current-stage="gameState.currentStage"
        @go-back="onGoBack"
        @proceed="onProceed"
      />
    </div>
  </div>
</template>

<style scoped>
.game-view {
  background-image: url('/img/bg.png');
  background-repeat: repeat;
  background-size: contain;
}
.game-content {
  margin: auto;
}
</style>
