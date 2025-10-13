<script setup>
import hOneSanImage from '../../assets/h-one-san.png';
import { resetGame } from '../../store/game-store.js';

// ボタンクリック時の処理（ゲームオーバー）
const handleButtonClick = () => {
  resetGame();
  window.scrollTo(0, 0);
};
</script>

<template>
  <!-- バナー（KeyVisual 風の埋め込み形式） -->
  <section class="ad-banner">
    <img :src="hOneSanImage" alt="Banner" class="banner-image" />
    <div class="banner-overlay"></div>
    <div class="banner-content">
      <h2 class="banner-title">今日は寂しいですか？</h2>
      <button class="banner-button" @click="handleButtonClick">
        彼女を確認してください
      </button>
    </div>
  </section>
</template>

<style scoped>
/* バナー（KeyVisual 風の埋め込み形式） */
.ad-banner {
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
  margin: 56px 0 40px;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.75) 100%
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
  margin-bottom: 25px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
}

.banner-button {
  background: linear-gradient(135deg, #ff1493, #ff69b4);
  color: white;
  border: none;
  padding: 16px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 20, 147, 0.4);
  transition: all 0.3s ease;
}

.banner-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(255, 20, 147, 0.6);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .banner-title {
    font-size: 2rem;
  }

  .banner-button {
    font-size: 1.2rem;
    padding: 12px 32px;
  }
}
</style>
