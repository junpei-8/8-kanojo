import { ref } from 'vue';

/**
 * アクティブな音声要素を管理するSet
 * @type {Set<HTMLAudioElement>}
 */
const activeAudios = new Set();

/**
 * 音声管理用のComposable
 * 全ての音声を一元管理し、ゲームリセット時などに一括で停止できるようにする
 *
 * @returns {{
 *   playAudio: (url: string, options?: AudioOptions) => HTMLAudioElement,
 *   stopAll: () => void,
 *   removeAudio: (audio: HTMLAudioElement) => void,
 *   getActiveCount: () => number
 * }}
 */
export function useAudioManager() {
  /**
   * 音声を再生し、管理対象に追加する
   *
   * @typedef {Object} AudioOptions
   * @property {boolean} [loop=false] - ループ再生するかどうか
   * @property {number} [volume=1.0] - 音量 (0.0 ~ 1.0)
   * @property {Function} [onEnded] - 再生終了時のコールバック
   *
   * @param {string} url - 音声ファイルのURL
   * @param {AudioOptions} [options={}] - 音声のオプション
   * @returns {HTMLAudioElement} - 作成されたAudio要素
   */
  function playAudio(url, options = {}) {
    const audio = new Audio(url);

    // オプションの設定
    audio.loop = options.loop || false;
    audio.volume = options.volume !== undefined ? options.volume : 1.0;

    // 管理対象に追加
    activeAudios.add(audio);

    // 再生終了時の処理
    const handleEnded = () => {
      if (options.onEnded) {
        options.onEnded();
      }
      // ループでない場合は自動的に管理対象から削除
      if (!audio.loop) {
        removeAudio(audio);
      }
    };

    audio.addEventListener('ended', handleEnded);

    // 再生開始
    audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
      // 再生失敗時も管理対象から削除
      removeAudio(audio);
    });

    return audio;
  }

  /**
   * 特定の音声を管理対象から削除し、停止する
   *
   * @param {HTMLAudioElement} audio - 削除する音声要素
   */
  function removeAudio(audio) {
    if (activeAudios.has(audio)) {
      audio.pause();
      audio.currentTime = 0;
      activeAudios.delete(audio);
    }
  }

  /**
   * 全ての音声を停止し、管理対象をクリアする
   * ゲームリセット時などに使用
   */
  function stopAll() {
    activeAudios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    activeAudios.clear();
  }

  /**
   * 現在アクティブな音声の数を取得（デバッグ用）
   *
   * @returns {number} - アクティブな音声の数
   */
  function getActiveCount() {
    return activeAudios.size;
  }

  return {
    playAudio,
    stopAll,
    removeAudio,
    getActiveCount,
  };
}
