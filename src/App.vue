<script setup>
import { computed } from 'vue'
import { gameState, resetGame } from './store/game-store.js'
import { useGameLogic } from './composables/use-game-logic.js'
import OpeningScene from './fragments/scenes/OpeningScene.vue'
import EndingScene from './fragments/scenes/EndingScene.vue'
import GameButtons from './fragments/sections/GameButtons.vue'
import KeyVisual from './fragments/sections/KeyVisual.vue'
import OtherKanojoSection from './fragments/sections/OtherKanojoSection.vue'
import GameFooter from './fragments/sections/GameFooter.vue'

const { handleAnswer, startRound } = useGameLogic()

/**
 * 最終ステージ（8回目）かどうか。
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const isLastStage = computed(() => gameState.value.currentStage === 7)

/**
 * ボタンが避けるモードかどうか（buttonDodge異変時）
 *
 * @type {import('vue').ComputedRef<boolean>}
 */
const dodgeMode = computed(() => gameState.value.currentAnomaly === 'buttonDodge')

/**
 * 戻るボタンのクリックハンドラー。
 * ページトップにスクロールしてから処理を実行。
 */
function onGoBack() {
  window.scrollTo(0, 0)
  handleAnswer(true)
}

/**
 * 進むボタンのクリックハンドラー。
 * windowSpam異変時は特殊処理を実行。
 * それ以外はページトップにスクロールしてから処理を実行。
 */
function onProceed() {
  // windowSpam異変の場合、confirmを表示してOKならリセット
  if (gameState.value.currentAnomaly === 'windowSpam') {
    if (confirm('本当に進みますか？')) {
      if (confirm('確認：本当に解約手続きを進めますか？')) {
        // OKを押した = 失敗（異変があるのに進んだ）
        window.scrollTo(0, 0)
        resetGame()
        startRound()
        return
      }
    }

    // キャンセルした場合は何もしない（正解は「戻る」ボタン）
    return
  }

  // 通常の処理
  window.scrollTo(0, 0)
  handleAnswer(false)
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

      <OtherKanojoSection
        :is-anomaly="gameState.currentAnomaly.id === 'otherKanojos'"
      />

      <GameFooter
        :is-last-stage="isLastStage"
        :dodge-mode="dodgeMode"
        :progress="(gameState.currentStage / 7) * 100"
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
