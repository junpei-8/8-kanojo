<script setup>
/**
 * ボタンが避ける異変コンポーネント
 * ボタンにホバーすると1回だけ避ける動作をする異変の視覚ヒントを表示
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
  <div class="anomaly-button-dodge">
    <p class="hint-text">⚠️ 慎重に操作してください</p>
  </div>
</template>

<style scoped>
.anomaly-button-dodge {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.hint-text {
  color: #ff9800;
  font-size: 13px;
  font-weight: bold;
  opacity: 0.8;
  background: rgba(255, 152, 0, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 152, 0, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
