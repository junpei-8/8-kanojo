<script setup>
/**
 * テキスト異変: 通常とは異なるテキストを表示する
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
  <div class="anomaly-text">
    <p class="warning-text">※この画面には異常があります※</p>
  </div>
</template>

<style scoped>
.anomaly-text {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.warning-text {
  color: #ff0000;
  font-size: 12px;
  opacity: 0.7;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% {
    opacity: 0.7;
  }
  25%, 75% {
    opacity: 0.2;
  }
}
</style>
