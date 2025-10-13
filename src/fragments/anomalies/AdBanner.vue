<script setup>
import { ref } from 'vue';
import hOneSanImage from '../../assets/h-one-san.png';
import { resetGame } from '../../store/game-store.js';

const showOverlay = ref(false);

// バナークリック時の処理（overlay を表示）
const handleBannerClick = () => {
  showOverlay.value = true;
};

// overlay のボタンクリック時の処理（ゲームオーバー）
const handleOverlayButtonClick = () => {
  // ゲームをリセット（ゲームオーバー）
  resetGame();
};
</script>

<template>
  <!-- バナー（KeyVisual みたいな埋め込み形式） -->
  <section class="ad-banner" @click="handleBannerClick">
    <img :src="hOneSanImage" alt="Banner" class="banner-image" />
    <div class="banner-overlay"></div>
    <div class="banner-content">
      <h2 class="banner-title">シングルは寂しい？</h2>
      <p class="banner-subtitle">今すぐ素敵な出会いを見つけよう！</p>
      <div class="banner-badge">18+</div>
    </div>
  </section>

  <!-- Overlay（全画面） -->
  <div v-if="showOverlay" class="ad-banner-overlay">
    <!-- 背景画像レイヤー -->
    <div class="ad-background"></div>

    <!-- 黒いオーバーレイ -->
    <div class="dark-overlay"></div>

    <!-- コンテンツレイヤー -->
    <div class="ad-content">
      <div class="ad-text-container">
        <h2 class="ad-title">シングルは寂しい？</h2>
        <p class="ad-subtitle">今すぐ素敵な出会いを見つけよう！</p>
        <p class="ad-description">
          18歳以上限定 / 完全匿名 / 即日マッチング可能
        </p>
      </div>

      <button class="ad-button" @click="handleOverlayButtonClick">
        <span class="button-text">今すぐ始める</span>
        <span class="button-arrow">→</span>
      </button>

      <p class="ad-disclaimer">※クリックで詳細ページへ移動します</p>
    </div>
  </div>
</template>

<style scoped>
/* バナー（KeyVisual 風の埋め込み形式） */
.ad-banner {
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.ad-banner:hover {
  transform: scale(1.02);
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%; /* 胸部分が見えるように調整 */
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: white;
  width: 90%;
}

.banner-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
}

.banner-subtitle {
  font-size: 1.8rem;
  margin-bottom: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  color: #fff;
}

.banner-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ff1493;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(255, 20, 147, 0.5);
}

/* Overlay（全画面） */
.ad-banner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 背景画像レイヤー */
.ad-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/h-one-san.png');
  background-size: cover;
  background-position: center 30%; /* 胸部分が見えるように調整 */
  background-repeat: no-repeat;
  filter: blur(2px); /* 軽いぼかしで雰囲気を出す */
}

/* 黒いオーバーレイ */
.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
}

/* コンテンツレイヤー */
.ad-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  border: 2px solid rgba(255, 105, 180, 0.5);
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.3);
  animation: slideUp 0.6s ease-out 0.3s both;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.ad-text-container {
  margin-bottom: 30px;
}

.ad-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
}

.ad-subtitle {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.ad-description {
  font-size: 1rem;
  color: #ffb6c1;
  margin-bottom: 0;
}

.ad-button {
  background: linear-gradient(135deg, #ff1493, #ff69b4);
  color: white;
  border: none;
  padding: 18px 50px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 6px 20px rgba(255, 20, 147, 0.4);
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 6px 20px rgba(255, 20, 147, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 20, 147, 0.6);
  }
}

.ad-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 30px rgba(255, 20, 147, 0.7);
}

.button-text {
  font-size: 1.3rem;
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.ad-button:hover .button-arrow {
  transform: translateX(5px);
}

.ad-disclaimer {
  margin-top: 20px;
  font-size: 0.85rem;
  color: #999;
  font-style: italic;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .ad-content {
    padding: 30px 20px;
    max-width: 90%;
  }

  .ad-title {
    font-size: 2rem;
  }

  .ad-subtitle {
    font-size: 1.2rem;
  }

  .ad-button {
    padding: 15px 40px;
    font-size: 1.2rem;
  }

  .button-text {
    font-size: 1.1rem;
  }
}
</style>
