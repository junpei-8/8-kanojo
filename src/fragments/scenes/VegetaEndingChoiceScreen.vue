<script setup>
import { gameState, resetGame } from '../../store/game-store.js';

/**
 * 通常エンディングを見る
 */
function showNormalEnding() {
  gameState.value.viewMode = 'ending';
}

/**
 * ベジータエンディングを見る
 */
function showVegetaEnding() {
  gameState.value.viewMode = 'vegetaEnding';
}

/**
 * はじめから
 */
function restart() {
  // ゲームステートをリセット
  resetGame();
  // オープニング画面へ
  gameState.value.viewMode = 'opening';
}
</script>

<template>
  <div class="choice-overlay">
    <div class="choice-box">
      <h2 class="choice-title">世界を解約しました</h2>
      <p class="choice-description">もう一度エンディングを見ますか？</p>
      <div class="choice-buttons">
        <button class="choice-button secondary" @click="showNormalEnding">
          エンディングを見る
        </button>
        <button class="choice-button secondary" @click="showVegetaEnding">
          隠しエンディングを見る
        </button>
        <button class="choice-button primary" @click="restart">
          はじめから
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choice-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.choice-box {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 60px 80px;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.choice-title {
  font-size: 36px;
  font-weight: 800;
  color: #333;
  margin-bottom: 24px;
}

.choice-description {
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.choice-button {
  padding: 20px 40px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.choice-button.primary {
  background-color: #ff6b6b;
  color: white;
}

.choice-button.primary:hover {
  background-color: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.choice-button.secondary {
  background-color: #e0e0e0;
  color: #666;
}

.choice-button.secondary:hover {
  background-color: #d0d0d0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
