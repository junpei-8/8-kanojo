<script setup>
// 色異変: 背景色を通常と異なる色に変える
</script>

<template>
  <div class="anomaly-color"></div>
</template>

<style scoped>
.anomaly-color {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(100, 255, 100, 0.15);
  pointer-events: none;
  z-index: 5;
  animation: colorPulse 3s infinite;
}

@keyframes colorPulse {
  0%, 100% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.25;
  }
}
</style>
