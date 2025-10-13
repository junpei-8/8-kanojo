import { ref } from 'vue';
import { useAudioManager } from '../composables/use-audio-manager.js';

/**
 * ゲーム状態。
 */
export const gameState = ref({
  gameStarted: false,
  currentStage: 0,
  usedAnomalies: [],
  currentAnomaly: null,
  isCleared: false,
});

// 音声管理のインスタンスを取得
const { stopAll } = useAudioManager();

// 異変のクリーンアップ関数を管理するSet
const cleanupCallbacks = new Set();

/**
 * 異変コンポーネントがクリーンアップ関数を登録する
 * @param {Function} callback - クリーンアップ関数
 * @returns {Function} - 登録を解除する関数
 */
export function registerCleanup(callback) {
  cleanupCallbacks.add(callback);
  // 登録解除用の関数を返す
  return () => {
    cleanupCallbacks.delete(callback);
  };
}

/**
 * 現在の異変のクリーンアップを同期的に実行
 * 音声の停止とタイマーのクリアなどを行う
 */
export function cleanupCurrentAnomaly() {
  // 全ての音声を停止
  stopAll();

  // 登録されたクリーンアップ関数を同期的に実行
  cleanupCallbacks.forEach((callback) => {
    try {
      callback();
    } catch (error) {
      console.error('Cleanup callback failed:', error);
    }
  });

  // クリーンアップ後は登録をクリア
  cleanupCallbacks.clear();
}

/**
 * ゲーム状態を初期化する。
 * ゲーム画面を維持したまま、カウントと異変をリセットする。
 */
export function resetGame() {
  // 現在の異変をクリーンアップ
  cleanupCurrentAnomaly();

  gameState.value = {
    gameStarted: true,
    currentStage: 0,
    usedAnomalies: [],
    currentAnomaly: null,
    isCleared: false,
  };
}
