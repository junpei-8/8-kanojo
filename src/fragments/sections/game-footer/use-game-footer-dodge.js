import { ref } from 'vue';

/**
 * dodge異変のボタン回避処理を行うコンポーザブル
 *
 * @returns {{
 *   hasDodged: import('vue').Ref<boolean>,
 *   isDodging: import('vue').Ref<boolean>,
 *   handleDodgeHover: () => void
 * }}
 */
export function useGameFooterDodge() {
  /**
   * ボタンが既に避けたかどうかのフラグ
   * @type {import('vue').Ref<boolean>}
   */
  const hasDodged = ref(false);

  /**
   * ボタンが避けている状態かどうか
   * @type {import('vue').Ref<boolean>}
   */
  const isDodging = ref(false);

  /**
   * 進むボタンにホバーしたときのハンドラー
   * 1回だけボタンが避ける動作をする
   */
  function handleDodgeHover() {
    if (!hasDodged.value) {
      isDodging.value = true;
      hasDodged.value = true;

      // アニメーション終了後（600ms）にisDodgingをリセット
      setTimeout(() => {
        isDodging.value = false;
      }, 600);
    }
  }

  return {
    hasDodged,
    isDodging,
    handleDodgeHover,
  };
}
