import { ref, nextTick } from 'vue';
import { useAudioManager } from '../composables/use-audio-manager.js';

/**
 * ゲーム状態。
 * @typedef {'opening' | 'game' | 'ending' | 'endingChoice' | 'vegetaEnding' | 'vegetaEndingChoice'} ViewMode
 */
export const gameState = ref({
  /** @type {ViewMode} */
  viewMode: 'opening',
  currentStage: 0,
  usedAnomalies: [],
  currentAnomaly: null,
  isResettingMojibake: false,
  windowSpamTriggered: false,
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
 * ゲーム状態を初期化する（同期）。
 * ゲーム画面を維持したまま、カウントと異変をリセットする。
 */
export function resetGame() {
  // 現在の異変をクリーンアップ
  cleanupCurrentAnomaly();

  gameState.value = {
    viewMode: 'game',
    currentStage: 0,
    usedAnomalies: [],
    currentAnomaly: null,
    isResettingMojibake: false,
    windowSpamTriggered: false,
  };
}

/**
 * ゲーム状態を強制的に初期化する（非同期）。
 * DOM直接操作している異変用。一瞬コンポーネントをアンマウントしてからリセットする。
 */
export async function hardResetGame() {
  // 一瞬非表示にしてコンポーネントを強制アンマウント
  gameState.value.isResettingMojibake = true;
  await nextTick();

  // 現在の異変をクリーンアップ
  cleanupCurrentAnomaly();

  gameState.value = {
    viewMode: 'game',
    currentStage: 0,
    usedAnomalies: [],
    currentAnomaly: null,
    isResettingMojibake: false,
    windowSpamTriggered: false,
  };
}
