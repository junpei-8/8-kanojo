<script setup>
import { ref } from 'vue'

/**
 * Props定義
 * @property {boolean} isLastStage - 最終ステージ（8回目）かどうか
 * @property {boolean} dodgeMode - ボタンが避けるモードかどうか
 */
const props = defineProps({
  isLastStage: {
    type: Boolean,
    default: false
  },
  dodgeMode: {
    type: Boolean,
    default: false
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
  <div class="button-group">
    <button @click="handleGoBack" class="action-button back-button">
      ← 戻る
    </button>
    <button
      @click="handleProceed"
      @mouseenter="handleProceedHover"
      :class="['action-button', 'proceed-button', { 'is-dodging': isDodging }]"
    >
      {{ isLastStage ? '解約する' : '進む →' }}
    </button>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.action-button {
  flex: 1;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button {
  background: #6c757d;
  color: white;
}

.back-button:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.proceed-button {
  background: #ff6b9d;
  color: white;
  position: relative;
}

.proceed-button:hover {
  background: #ff5a8d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

/* ボタンが避ける動作 */
.proceed-button.is-dodging {
  animation: dodgeRight 0.3s ease-out;
  pointer-events: none;
}

@keyframes dodgeRight {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(80px);
  }
  100% {
    transform: translateX(0);
  }
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .button-group {
    flex-direction: column;
  }

  @keyframes dodgeRight {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(50px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
