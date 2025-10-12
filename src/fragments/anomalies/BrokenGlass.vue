<script setup>
import { onMounted, ref } from 'vue';

const showBrokenGlass = ref(false);

// 音声ファイルパス（public フォルダ内に置く）
const glassBreaking1 = '/audio/glass-breaking-1.mp3'; // 割れる音
const glassBreaking2 = '/audio/glass-breaking-2.mp3'; // ヒビ音

const triggerBrokenGlass = () => {
  // まずヒビ音を鳴らす
  const audio1 = new Audio(glassBreaking1);
  const audio2 = new Audio(glassBreaking2);

  // ヒビ音の長さに応じて割れる音 & 画像表示
  audio1.onended = () => {
    audio2.play();
    showBrokenGlass.value = true;
  };
  audio2.onended = () => {
    // 音が終わったら画像を消す
    showBrokenGlass.value = false;
  };
  audio1.play();
};

onMounted(() => {
  // 3秒後に割れる
  setTimeout(() => {
    triggerBrokenGlass();
  }, 3000);
});
</script>

<template>
  <div>
    <!-- 画面全体に画像を表示 -->
    <div v-if="showBrokenGlass" class="full-screen-image">
      <img src="/img/glass/brokenglass.png" alt="Broken Glass" />
    </div>
  </div>
</template>

<style scoped>
.trigger-button,
.clear-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0.5rem;
  color: white;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.clear-button {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
}

.full-screen-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-screen-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
