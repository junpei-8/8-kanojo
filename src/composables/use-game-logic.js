import { computed } from 'vue';
import {
  gameState,
  resetGame,
  cleanupCurrentAnomaly,
} from '../store/game-store.js';
import { anomalies } from '../types/anomalies.js';

/**
 * ゲームロジックを提供するコンポーザブル。
 *
 * @returns {{
 *   gameState: import('vue').Ref<import('../store/game-store.js').GameState>,
 *   currentAnomalyComponent: import('vue').ComputedRef<import('vue').Component | null>,
 *   startGame: () => void,
 *   startRound: () => void,
 *   handleAnswer: (goBack: boolean) => void,
 *   resetGame: () => void
 * }}
 */
export function useGameLogic() {
  /**
   * 現在の異変コンポーネントを取得
   * @type {import('vue').ComputedRef<import('vue').Component | null>}
   */
  const currentAnomalyComponent = computed(() => {
    if (!gameState.value.currentAnomaly) return null;
    const anomaly = anomalies.find(
      (a) => a.id === gameState.value.currentAnomaly,
    );
    return anomaly?.component || null;
  });

  /**
   * ゲーム開始処理
   * gameStartedをtrueにしてラウンドを開始する
   */
  function startGame() {
    gameState.value.gameStarted = true;
    startRound();
  }

  /**
   * ラウンド開始処理
   * 80%の確率で異変を表示し、使用済みでない異変をランダムに選択する
   */
  function startRound() {
    // 前の異変のクリーンアップを同期的に実行
    cleanupCurrentAnomaly();

    // 最初のラウンド（0/8）と最終ステージ（8/8）では必ず異変なし
    if (
      gameState.value.currentStage === 0 ||
      gameState.value.currentStage === 7
    ) {
      gameState.value.currentAnomaly = null;
      return;
    }

    // 80%の確率で異変を表示
    const shouldShowAnomaly = Math.random() < 0.8;

    if (shouldShowAnomaly) {
      // 使用済みでない異変をフィルタリング
      const availableAnomalies = anomalies.filter(
        (a) => !gameState.value.usedAnomalies.includes(a.id),
      );

      // 利用可能な異変がある場合、ランダムに選択
      if (availableAnomalies.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * availableAnomalies.length,
        );
        gameState.value.currentAnomaly = availableAnomalies[randomIndex].id;
      } else {
        // すべての異変を使い切った場合は異変なし
        gameState.value.currentAnomaly = null;
      }
    } else {
      // 異変なし
      gameState.value.currentAnomaly = null;
    }
  }

  /**
   * 回答判定処理
   * @param {boolean} goBack - 戻るボタンを押したかどうか
   */
  function handleAnswer(goBack) {
    const hasAnomaly = gameState.value.currentAnomaly !== null;
    const isCorrect = (hasAnomaly && goBack) || (!hasAnomaly && !goBack);

    if (isCorrect) {
      // 正解の場合
      // 異変があった場合は使用済みリストに追加
      if (gameState.value.currentAnomaly) {
        gameState.value.usedAnomalies.push(gameState.value.currentAnomaly);
      }

      // ステージを進める
      gameState.value.currentStage++;

      // クリア判定
      if (gameState.value.currentStage >= 8) {
        gameState.value.isCleared = true;
        gameState.value.currentAnomaly = null;
      } else {
        // 次のラウンドを開始
        startRound();
      }
    } else {
      // 不正解の場合（ゲームオーバー）
      // ゲーム画面は維持したまま、カウントを0に戻してページトップへ
      resetGame();
      window.scrollTo(0, 0);
      startRound();
    }
  }

  return {
    gameState,
    currentAnomalyComponent,
    startGame,
    startRound,
    handleAnswer,
    resetGame,
  };
}
