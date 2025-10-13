<script setup>
import { computed } from 'vue';
import { useGameLogic } from './composables/use-game-logic.js';
import AdBanner from './fragments/anomalies/AdBanner.vue';
import BrokenGlass from './fragments/anomalies/BrokenGlass.vue';
import Calling from './fragments/anomalies/Calling.vue';
import Comment from './fragments/anomalies/Comment.vue';
import MojiBake from './fragments/anomalies/MojiBake.vue';
import WindowSpam from './fragments/anomalies/WindowSpam.vue';
import EndingScene from './fragments/scenes/EndingScene.vue';
import EndingChoiceScreen from './fragments/scenes/EndingChoiceScreen.vue';
import EndingVegetaScene from './fragments/scenes/EndingVegetaScene.vue';
import VegetaEndingChoiceScreen from './fragments/scenes/VegetaEndingChoiceScreen.vue';
import OpeningScene from './fragments/scenes/OpeningScene.vue';
import GameFooter from './fragments/sections/game-footer/GameFooter.vue';
import KeyVisual from './fragments/sections/KeyVisual.vue';
import OtherKanojoSection from './fragments/sections/OtherKanojoSection.vue';
import ReasonSection from './fragments/sections/ReasonSection.vue';
import { gameState } from './store/game-store.js';

const { handleAnswer, startRound, footerMode } = useGameLogic();

/**
 * 最終ステージ（8回目）かどうか。
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const isLastStage = computed(() => gameState.value.currentStage === 8);

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
  <OpeningScene v-if="gameState.viewMode === 'opening'" :key="gameState.viewMode" />

  <!-- エンディングシーン -->
  <EndingScene v-if="gameState.viewMode === 'ending'" :key="gameState.viewMode" />

  <!-- エンディング選択画面 -->
  <EndingChoiceScreen v-if="gameState.viewMode === 'endingChoice'" :key="gameState.viewMode" />

  <!-- ベジータエンディングシーン -->
  <EndingVegetaScene v-if="gameState.viewMode === 'vegetaEnding'" :key="gameState.viewMode" />

  <!-- ベジータエンディング選択画面 -->
  <VegetaEndingChoiceScreen v-if="gameState.viewMode === 'vegetaEndingChoice'" :key="gameState.viewMode" />

  <!-- ゲーム画面 -->
  <div class="game-view" v-if="gameState.viewMode === 'game'">
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

      <MojiBake v-if="gameState.currentAnomaly === 'mojibake' && !gameState.isResettingMojibake" />

      <AdBanner v-if="gameState.currentAnomaly === 'adBanner'" />

      <Comment v-if="gameState.currentAnomaly === 'comment'" />

      <WindowSpam v-if="gameState.currentAnomaly === 'windowSpam'" />

      <GameFooter
        :is-last-stage="isLastStage"
        :mode="footerMode"
        :progress="(gameState.currentStage / 8) * 100"
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
