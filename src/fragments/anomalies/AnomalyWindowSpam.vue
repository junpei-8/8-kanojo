<script setup>
/**
 * ウィンドウスパム異変コンポーネント
 * 進むボタンを押すとconfirmが複数表示される異変の視覚ヒントを表示
 *
 * Props:
 * @property {string} [mode] - 異変のモード（将来の拡張用）
 */
defineProps({
  mode: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="anomaly-window-spam">
    <div class="warning-banner">
      <p class="warning-text">⚠️ 複数のダイアログが表示される可能性があります</p>
    </div>
  </div>
</template>

<style scoped>
.anomaly-window-spam {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.warning-banner {
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  padding: 12px 24px;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.15);
}

.warning-text {
  margin: 0;
  color: #d32f2f;
  font-size: 14px;
  font-weight: bold;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .warning-banner {
    padding: 10px 16px;
  }

  .warning-text {
    font-size: 12px;
  }
}
</style>
