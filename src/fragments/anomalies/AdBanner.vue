<script setup>
import { ref } from 'vue'

/**
 * Props定義
 * @property {string} [mode] - 異変のモード（将来の拡張用）
 */
defineProps({
  mode: {
    type: String,
    default: ''
  }
})

/**
 * 広告バナーが展開されているかどうか
 * @type {import('vue').Ref<boolean>}
 */
const isExpanded = ref(false)

/**
 * 広告バナーの展開状態を切り替える
 */
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="ad-banner-container">
    <div class="ad-banner" @click="toggleExpand">
      <div class="banner-content">
        <span class="banner-emoji">💕</span>
        <span class="banner-text">あなたに秘密をおしえちゃう♡</span>
        <span class="banner-arrow">{{ isExpanded ? '▲' : '▼' }}</span>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="isExpanded" class="expanded-content">
        <div class="secret-message">
          <p>✨ 特別なお知らせ ✨</p>
          <p>今だけの限定情報をお届けします</p>
          <button class="cta-button">詳しく見る</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ad-banner-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.ad-banner {
  background: linear-gradient(135deg, #ff6b9d 0%, #ffa6c9 100%);
  padding: 12px 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.ad-banner:hover {
  background: linear-gradient(135deg, #ff5a8d 0%, #ff96b9 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.banner-emoji {
  font-size: 20px;
  animation: pulse 2s ease-in-out infinite;
}

.banner-text {
  letter-spacing: 0.5px;
}

.banner-arrow {
  font-size: 12px;
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.expanded-content {
  background: linear-gradient(180deg, #ffa6c9 0%, #ffc4dd 100%);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.secret-message {
  text-align: center;
  color: #333;
  max-width: 500px;
  margin: 0 auto;
}

.secret-message p {
  margin: 8px 0;
  font-size: 15px;
}

.secret-message p:first-child {
  font-size: 18px;
  font-weight: bold;
  color: #ff1493;
}

.cta-button {
  margin-top: 16px;
  padding: 10px 24px;
  background: white;
  color: #ff1493;
  border: 2px solid #ff1493;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.cta-button:hover {
  background: #ff1493;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 20, 147, 0.3);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  opacity: 1;
  transform: translateY(0);
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .banner-content {
    font-size: 14px;
  }

  .banner-emoji {
    font-size: 18px;
  }

  .expanded-content {
    padding: 16px;
  }

  .secret-message p:first-child {
    font-size: 16px;
  }

  .secret-message p {
    font-size: 13px;
  }
}
</style>