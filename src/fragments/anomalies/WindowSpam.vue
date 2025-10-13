<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { gameState, registerCleanup, resetGame } from '../../store/game-store.js';
import { useGameLogic } from '../../composables/use-game-logic.js';

const { startRound } = useGameLogic();

// ウィンドウの状態管理
const windows = ref([]);
let windowIdCounter = 0;
const maxWindows = 15;

// タイマーIDを管理するSet
const activeTimers = new Set();

// ウィンドウのメッセージバリエーション
const messages = [
  { title: '解約確認', content: 'このまま解約を続けますか？\nもう一度考え直してください。' },
  { title: '特別割引', content: '今だけ！月額50%OFF\nこの機会をお見逃しなく！' },
  { title: '重要なお知らせ', content: '契約を継続すると\n豪華特典がもらえます！' },
  { title: '警告', content: '解約すると全てのデータが\n削除される可能性があります。' },
  { title: 'アンケート', content: '解約理由を教えてください。\n改善に役立てます。' },
  { title: '最終確認', content: '本当に解約しますか？\n取り消しはできません。' },
  { title: 'お得情報', content: '友達紹介で両方に\n1ヶ月無料プレゼント！' },
  { title: 'サポート', content: 'お困りですか？\n24時間サポートが対応します。' },
];

// タイマーを登録して管理
const addTimer = (timerId) => {
  activeTimers.add(timerId);
  return timerId;
};

// タイマーをクリア
const clearTimer = (timerId) => {
  if (timerId) {
    clearTimeout(timerId);
    activeTimers.delete(timerId);
  }
};

// 全てのタイマーをクリア
const clearAllTimers = () => {
  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers.clear();
};

// ランダムな位置を生成（画面内に収まるように）
const getRandomPosition = () => {
  const maxX = window.innerWidth - 350; // ウィンドウ幅を考慮
  const maxY = window.innerHeight - 250; // ウィンドウ高さを考慮
  return {
    x: Math.max(20, Math.random() * maxX),
    y: Math.max(20, Math.random() * maxY),
  };
};

// ランダムなメッセージを取得
const getRandomMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)];
};

// 新しいウィンドウを作成
const createWindow = () => {
  if (windows.value.length >= maxWindows) return;

  const position = getRandomPosition();
  const message = getRandomMessage();

  windows.value.push({
    id: windowIdCounter++,
    ...position,
    ...message,
    zIndex: 1000 + windowIdCounter,
  });
};

// ウィンドウを閉じる（ウィンドウ内のボタンをクリック → ゲームオーバー）
const closeWindow = (windowId) => {
  // ウィンドウ内のボタンをクリックしたらゲームオーバー
  window.scrollTo(0, 0);
  resetGame();
  startRound();
};

// ウィンドウを定期的に生成
const scheduleWindowCreation = () => {
  const randomTime = Math.floor(Math.random() * 500) + 300; // 300ms〜800ms（かなり高速）

  const timerId = setTimeout(() => {
    createWindow();
    if (windows.value.length < maxWindows) {
      scheduleWindowCreation();
    }
  }, randomTime);
  addTimer(timerId);
};

// ウィンドウスパムを開始する関数
const startWindowSpam = () => {
  // 最初のウィンドウを即座に表示
  createWindow();

  // 200ms後に2つ目を表示
  const timerId1 = setTimeout(() => {
    createWindow();
  }, 200);
  addTimer(timerId1);

  // 400ms後に3つ目を表示してから、定期生成を開始
  const timerId2 = setTimeout(() => {
    createWindow();
    scheduleWindowCreation();
  }, 400);
  addTimer(timerId2);
};

// クリーンアップ関数をgame-storeに登録解除する関数
let unregisterCleanup = null;

// windowSpamTriggered を監視して、trueになったらウィンドウスパム開始
watch(
  () => gameState.value.windowSpamTriggered,
  (newValue) => {
    if (newValue) {
      startWindowSpam();
    }
  }
);

// コンポーネントがマウントされた時にクリーンアップ関数を登録
onMounted(() => {
  // クリーンアップ関数を登録
  unregisterCleanup = registerCleanup(() => {
    clearAllTimers();
    windows.value = [];
  });

  // windowSpamTriggered が既にtrueの場合は即座に開始（念のため）
  if (gameState.value.windowSpamTriggered) {
    startWindowSpam();
  }
});

// コンポーネントがアンマウントされる時の処理
onUnmounted(() => {
  if (unregisterCleanup) {
    unregisterCleanup();
  }
});
</script>

<template>
  <div class="window-spam-container">
    <div
      v-for="window in windows"
      :key="window.id"
      class="mac-window"
      :style="{
        left: `${window.x}px`,
        top: `${window.y}px`,
        zIndex: window.zIndex,
      }"
    >
      <!-- タイトルバー -->
      <div class="title-bar">
        <div class="traffic-lights">
          <button
            class="traffic-light close"
            @click="closeWindow(window.id)"
            title="閉じる"
          ></button>
          <button class="traffic-light minimize"></button>
          <button class="traffic-light maximize"></button>
        </div>
        <div class="window-title">{{ window.title }}</div>
      </div>

      <!-- コンテンツ -->
      <div class="window-content">
        <p class="window-message">{{ window.content }}</p>
        <div class="window-buttons">
          <button class="window-btn cancel" @click="closeWindow(window.id)">
            キャンセル
          </button>
          <button class="window-btn confirm" @click="closeWindow(window.id)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-spam-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 900;
}

.mac-window {
  position: fixed;
  width: 320px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
  pointer-events: auto;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.title-bar {
  background: linear-gradient(to bottom, #e8e8e8, #d0d0d0);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #b0b0b0;
  user-select: none;
}

.traffic-lights {
  display: flex;
  gap: 8px;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.traffic-light:hover {
  filter: brightness(1.1);
}

.traffic-light.close {
  background: linear-gradient(135deg, #ff5f57, #ff3b30);
}

.traffic-light.close:hover::after {
  content: '×';
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #8b0000;
  font-weight: bold;
}

.traffic-light.minimize {
  background: linear-gradient(135deg, #ffbd2e, #ff9500);
}

.traffic-light.maximize {
  background: linear-gradient(135deg, #28c840, #00c400);
}

.window-title {
  flex: 1;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.window-content {
  padding: 20px;
  background: #ffffff;
}

.window-message {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 20px 0;
  white-space: pre-line;
  min-height: 60px;
}

.window-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.window-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.window-btn.cancel {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #d0d0d0;
}

.window-btn.cancel:hover {
  background: #e0e0e0;
}

.window-btn.confirm {
  background: linear-gradient(135deg, #007aff, #0051d5);
  color: white;
}

.window-btn.confirm:hover {
  background: linear-gradient(135deg, #0051d5, #003da5);
  transform: scale(1.02);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .mac-window {
    width: 280px;
    left: 50% !important;
    transform: translateX(-50%);
  }

  .window-message {
    font-size: 13px;
  }
}
</style>
