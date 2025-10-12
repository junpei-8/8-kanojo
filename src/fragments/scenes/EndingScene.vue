<script setup>
import { resetGame } from '../../store/game-store.js'
import { useGameLogic } from '../../composables/use-game-logic.js'

const { startRound } = useGameLogic()

/**
 * ゲームをリスタートする
 * ゲーム状態をリセットして新しいラウンドを開始する
 */
function restart() {
  resetGame()
  startRound()
}
</script>

<template>
  <div class="ending-overlay">
    <div class="ending-content">
      <h1 class="ending-title">ゲームクリア！</h1>
      <p class="ending-message">
        おめでとうございます！<br>
        すべての異変を見抜きました。
      </p>
      <button @click="restart" class="restart-button">
        もう一度プレイ
      </button>
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
  background: linear-gradient(135deg, rgba(107, 255, 157, 0.95) 0%, rgba(157, 255, 182, 0.95) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.5s ease;
}

.ending-content {
  background: white;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 500px;
  animation: fadeInUp 0.5s ease;
}

.ending-title {
  font-size: 36px;
  color: #ff6b9d;
  margin-bottom: 20px;
  animation: bounce 1s ease infinite;
}

.ending-message {
  font-size: 18px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
}

.restart-button {
  padding: 15px 40px;
  font-size: 16px;
  font-weight: bold;
  background: #ff6b9d;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.restart-button:hover {
  background: #ff5a8d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .ending-content {
    padding: 40px 25px;
    margin: 20px;
  }

  .ending-title {
    font-size: 28px;
  }
}
</style>
