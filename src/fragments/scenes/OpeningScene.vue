<script setup>
import { useGameLogic } from '../../composables/use-game-logic.js'

const { startGame } = useGameLogic()

/**
 * ゲームを開始する
 * スタートボタンクリック時に呼ばれる
 */
function onStart() {
  startGame()
}
</script>

<template>
  <div class="opening-overlay">
    <div class="opening-content">
      <h1 class="game-title">8番彼女</h1>
      <div class="game-description">
        <p class="description-text">
          レンタル彼女サービスの解約ページに<br>
          <strong>異変</strong>が表示されることがあります。
        </p>
        <div class="rules">
          <h2 class="rules-title">ゲームルール</h2>
          <ul class="rules-list">
            <li><strong>異変がある場合</strong> → 「戻る」ボタンを押す</li>
            <li><strong>異変がない場合</strong> → 「進む」ボタンを押す</li>
            <li>間違えるとカウントが0に戻ります</li>
            <li>8回連続で正解するとゲームクリア！</li>
          </ul>
        </div>
      </div>
      <button @click="onStart" class="start-button">
        ゲームスタート
      </button>
    </div>
  </div>
</template>

<style scoped>
.opening-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.95) 0%, rgba(255, 182, 193, 0.95) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.5s ease;
}

.opening-content {
  background: white;
  padding: 60px 50px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 600px;
  animation: slideUp 0.6s ease;
}

.game-title {
  font-size: 48px;
  color: #ff6b9d;
  margin-bottom: 30px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.game-description {
  margin-bottom: 40px;
}

.description-text {
  font-size: 18px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
}

.rules {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 25px;
  text-align: left;
}

.rules-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

.rules-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rules-list li {
  font-size: 16px;
  color: #555;
  line-height: 2;
  padding-left: 25px;
  position: relative;
}

.rules-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #ff6b9d;
  font-weight: bold;
  font-size: 18px;
}

.start-button {
  padding: 18px 60px;
  font-size: 20px;
  font-weight: bold;
  background: #ff6b9d;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
}

.start-button:hover {
  background: #ff5a8d;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
}

.start-button:active {
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .opening-content {
    padding: 40px 30px;
    margin: 20px;
  }

  .game-title {
    font-size: 36px;
  }

  .description-text {
    font-size: 16px;
  }

  .rules {
    padding: 20px;
  }

  .rules-title {
    font-size: 18px;
  }

  .rules-list li {
    font-size: 14px;
  }

  .start-button {
    padding: 15px 50px;
    font-size: 18px;
  }
}
</style>
