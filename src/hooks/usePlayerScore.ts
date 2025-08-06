import { useAtomValue } from "jotai"

import { gameScoreAtom } from "../store/atoms"
import { playerId, ScoreCategory } from "../types";

const usePlayerScore = () => {
  const gameScore = useAtomValue(gameScoreAtom);

  function playerCategoryScoreAsNumber(playerId: playerId, category: ScoreCategory): number {
    return playerCategoryScore(playerId, category) || 0;
  }

  function playerCategoryScore(playerId: playerId, category: ScoreCategory): number | null {
    return gameScore[playerId][category];
  }

  function upperSectionTotals(id: playerId) {
    const subtotal =
      playerCategoryScoreAsNumber(id, 'ones') +
      playerCategoryScoreAsNumber(id, 'twos') +
      playerCategoryScoreAsNumber(id, 'threes') +
      playerCategoryScoreAsNumber(id, 'fours') +
      playerCategoryScoreAsNumber(id, 'fives') +
      playerCategoryScoreAsNumber(id, 'sixes');

    const bonus = subtotal >= 63 ? 35 : 0;

    const total = subtotal + bonus;

    return { subtotal, bonus, total };
  }

  return {
    playerCategoryScore,
    upperSectionTotals
  }
}

export default usePlayerScore;
