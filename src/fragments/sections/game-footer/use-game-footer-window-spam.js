import { resetGame } from '../../../store/game-store.js';
import { useGameLogic } from '../../../composables/use-game-logic.js';

/**
 * window-spam異変の処理を行うコンポーザブル
 *
 * @returns {{
 *   handleWindowSpamProceed: () => boolean
 * }}
 */
export function useGameFooterWindowSpam() {
  const { startRound } = useGameLogic();

  /**
   * window-spam異変時の「進む」ボタン処理
   * 進んだ場合はゲームオーバー
   *
   * @returns {boolean} 通常の処理を続行するかどうか（false = 処理中断）
   */
  function handleWindowSpamProceed() {
    // 異変があるのに進んだ = ゲームオーバー
    window.scrollTo(0, 0);
    resetGame();
    startRound();
    return false; // 処理を中断
  }

  return {
    handleWindowSpamProceed,
  };
}
