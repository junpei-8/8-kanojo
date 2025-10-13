import { gameState } from '../../../store/game-store.js';

/**
 * window-spam異変の処理を行うコンポーザブル
 *
 * @returns {{
 *   handleWindowSpamProceed: () => boolean
 * }}
 */
export function useGameFooterWindowSpam() {
  /**
   * window-spam異変時の「進む」ボタン処理
   * ウィンドウスパムをトリガーするだけ（ゲームオーバーにはならない）
   *
   * @returns {boolean} 通常の処理を続行するかどうか（false = 処理中断）
   */
  function handleWindowSpamProceed() {
    // ウィンドウスパムを開始（トリガーのみ）
    gameState.value.windowSpamTriggered = true;

    return false; // 処理を中断
  }

  return {
    handleWindowSpamProceed,
  };
}
