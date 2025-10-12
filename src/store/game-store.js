import { ref } from 'vue'

/**
 * @typedef {Object} GameState
 * @property {boolean} gameStarted
 * @property {number} currentStage
 * @property {string[]} usedAnomalies
 * @property {string | null} currentAnomaly
 * @property {boolean} isCleared
 */

/** @type {import('vue').Ref<GameState>} */
export const gameState = ref({
  gameStarted: false,
  currentStage: 0,
  usedAnomalies: [],
  currentAnomaly: null,
  isCleared: false
})

/**
 * ゲーム状態を初期化する。
 */
export function resetGame() {
  gameState.value = {
    gameStarted: false,
    currentStage: 0,
    usedAnomalies: [],
    currentAnomaly: null,
    isCleared: false
  }
}
