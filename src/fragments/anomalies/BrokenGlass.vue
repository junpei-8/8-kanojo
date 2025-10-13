<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAudioManager } from '../../composables/use-audio-manager.js';
import { registerCleanup } from '../../store/game-store.js';

// 音声管理
const { playAudio } = useAudioManager();

const showBrokenGlass = ref(false);
const audio1Ref = ref(null);
const audio2Ref = ref(null);
const timeoutId = ref(null);

// 音声ファイルパス（public フォルダ内に置く）
const glassBreaking1 = '/audio/glass-breaking-1.mp3'; // 割れる音
const glassBreaking2 = '/audio/glass-breaking-2.mp3'; // ヒビ音

const triggerBrokenGlass = () => {
  // まずヒビ音を鳴らす
  audio1Ref.value = playAudio(glassBreaking1, {
    onEnded: () => {
      // ヒビ音終了後に割れる音を再生 & 画像表示
      audio2Ref.value = playAudio(glassBreaking2, {
        onEnded: () => {
          // 音が終わったら画像を消す
          showBrokenGlass.value = false;
          audio2Ref.value = null;
        },
      });
      showBrokenGlass.value = true;
      audio1Ref.value = null;
    },
  });
};

// クリーンアップ関数を登録解除する関数
let unregisterCleanup = null;

onMounted(() => {
  // クリーンアップ関数を登録
  unregisterCleanup = registerCleanup(() => {
    // タイムアウトをクリア
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
    // 音声参照をクリア（実際の音声停止はaudio managerが自動で行う）
    audio1Ref.value = null;
    audio2Ref.value = null;
  });

  // 3秒後に割れる
  timeoutId.value = setTimeout(() => {
    triggerBrokenGlass();
  }, 3000);
});

onUnmounted(() => {
  // クリーンアップ関数の登録を解除
  if (unregisterCleanup) {
    unregisterCleanup();
  }
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
