<script setup>
import { ref } from 'vue'

/**
 * Props定義
 * @property {boolean} isLastStage - 最終ステージ（8回目）かどうか
 * @property {boolean} dodgeMode - ボタンが避けるモードかどうか
 * @property {number} progress - 進行度（0〜100の数値）
 */
const props = defineProps({
  isLastStage: {
    type: Boolean,
    default: false
  },
  dodgeMode: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    required: true
  }
})

/**
 * Events定義
 */
const emit = defineEmits(['goBack', 'proceed'])

/**
 * ボタンが既に避けたかどうかのフラグ
 * @type {import('vue').Ref<boolean>}
 */
const hasDodged = ref(false)

/**
 * ボタンが避けている状態かどうか
 * @type {import('vue').Ref<boolean>}
 */
const isDodging = ref(false)

/**
 * 戻るボタンのクリックハンドラー
 */
function handleGoBack() {
  emit('goBack')
}

/**
 * 進むボタンのクリックハンドラー
 */
function handleProceed() {
  emit('proceed')
}

/**
 * 進むボタンにホバーしたときのハンドラー（dodgeMode時のみ）
 */
function handleProceedHover() {
  if (props.dodgeMode && !hasDodged.value) {
    isDodging.value = true
    hasDodged.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 横長テロップ広告 -->
    <div class="telop-ad">
      <span class="telop-text">
        契約更新される方限定！月額料金
        <span class="telop-number">￥1000OFF</span>
      </span>
    </div>
    <div class="button-row">
      <button class="action-btn" @click="handleGoBack">キャンセル</button>
      <button class="action-btn" @click="handleProceed" @mouseenter="handleProceedHover">
        {{ props.isLastStage ? '解約する' : '進む' }}
      </button>
    </div>
    <!-- 8-segment progress bar -->
    <div class="progress-bar-wrapper">
      <div v-for="n in 8" :key="n" class="progress-segment"></div>
      <div class="progress-bar" :style="{width: `${props.progress}%`}"></div>
      <span class="progress-text">{{ props.progress }} / 8</span>
    </div>
  </div>
</template>


<style scoped>
button.action-btn {
  background: #fff;
  color: #222;
  border: 1px solid #bbb;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: box-shadow 0.25s, transform 0.25s, background 0.25s, color 0.25s, border-color 0.25s;
}
button.action-btn:active {
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
button.action-btn:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.18);
  transform: scale(1.07);
}
button.action-btn:first-child:hover {
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  color: #fff;
  border-color: #1976d2;
}
button.action-btn:last-child:hover {
  background: linear-gradient(90deg, #e53935 0%, #ff7043 100%);
  color: #fff;
  border-color: #e53935;
}

.progress-segment:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 12px;
}

/* Telop ad styles */
.telop-ad {
  width: 100%;
  max-width: 700px;
  margin: 40px auto 0 auto;
  background: repeating-linear-gradient(135deg, #ffe0e0 0px, #ffe0e0 40px, #fffbe6 40px, #fffbe6 80px);
  border: 2px solid #e53935;
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(229,57,53,0.12);
  padding: 22px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.telop-text {
  font-size: 1.4rem;
  font-weight: bold;
  color: #e53935;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.telop-number {
  font-size: 2.2rem;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(90deg, #e53935 0%, #ff7043 100%);
  border-radius: 16px;
  padding: 4px 24px;
  margin-left: 12px;
  box-shadow: 0 2px 12px rgba(229,57,53,0.18);
  border: 2px solid #ffd700;
}
.progress-bar-wrapper {
  border-radius: 100vh;
  height: 12px;
  background-color: #aaa;
  margin-top: 20px;
}
.progress-bar {
  height: 100%;
  background-color: #1976d2;
  border-radius: 100vh;
}
.progress-text {
  display: block;
  text-align: center;
}
.container {
  padding: 0 20px;
}
</style>
