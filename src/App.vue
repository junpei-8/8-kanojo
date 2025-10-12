<script setup>
import { computed } from 'vue'
import { gameState, resetGame } from './store/game-store.js'
import { useGameLogic } from './composables/use-game-logic.js'
import OpeningScene from './fragments/scenes/OpeningScene.vue'
import EndingScene from './fragments/scenes/EndingScene.vue'
import GameButtons from './fragments/sections/GameButtons.vue'

const { currentAnomalyComponent, handleAnswer, startRound } = useGameLogic()

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
  <div v-if="gameState.gameStarted" class="cancel-page">
    <!-- 進捗表示 -->
    <div class="progress-bar">
      <span class="progress-text">進捗: {{ gameState.currentStage }}/8</span>
    </div>

    <!-- ゲーム画面 -->
    <div class="game-content">
      <!-- 異変コンポーネントの動的表示 -->
      <component :is="currentAnomalyComponent" v-if="currentAnomalyComponent" />

      <!-- 解約フォーム -->
      <div class="cancel-form">
        <h1 class="form-title">レンタル彼女サービス解約手続き</h1>

        <div class="form-section">
          <label class="form-label">ご契約者名</label>
          <input type="text" class="form-input" value="山田 太郎" readonly />
        </div>

        <div class="form-section">
          <label class="form-label">契約プラン</label>
          <input type="text" class="form-input" value="プレミアムプラン（月額9,800円）" readonly />
        </div>

        <div class="form-section">
          <label class="form-label">契約開始日</label>
          <input type="text" class="form-input" value="2024年1月1日" readonly />
        </div>

        <div class="form-section">
          <label class="form-label">解約理由</label>
          <textarea class="form-textarea" readonly>本当の恋人ができたため</textarea>
        </div>

        <div class="info-box">
          <p class="info-text">
            ※ このページに<strong>異変がある場合は「戻る」</strong>ボタンを押してください<br>
            ※ <strong>異変がない場合は「進む」</strong>ボタンを押してください
          </p>
        </div>

        <!-- ボタン -->
        <GameButtons
          :is-last-stage="isLastStage"
          :dodge-mode="dodgeMode"
          @go-back="onGoBack"
          @proceed="onProceed"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cancel-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeef8 0%, #fff5f9 100%);
  padding: 100px 20px 40px;
  position: relative;
}

.progress-bar {
  position: fixed;
  top: 60px;
  right: 20px;
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.progress-text {
  font-weight: bold;
  color: #ff6b9d;
  font-size: 16px;
}

.game-content {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.cancel-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #ff6b9d;
  padding-bottom: 15px;
}

.form-section {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  color: #666;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: #f9f9f9;
  color: #333;
  box-sizing: border-box;
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
}

.info-box {
  background: #fff8dc;
  border: 2px solid #ffd700;
  border-radius: 8px;
  padding: 15px;
  margin: 25px 0;
}

.info-text {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .cancel-form {
    padding: 25px;
  }

  .form-title {
    font-size: 20px;
  }
}
</style>
