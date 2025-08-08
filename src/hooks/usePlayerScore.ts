import { useAtom } from "jotai";

import { gameScoreAtom } from "../store/atoms";
import { playerId, ScoreCategory } from "../types";
import { yahtzeeScore } from "../constants";
import useTurnScore from "./useTurnScore";

const usePlayerScore = () => {
  const [gameScore, setGameScore] = useAtom(gameScoreAtom);

  const { getScoreOfCategory } = useTurnScore();

  function playerCategoryScoreAsNumber(
    playerId: playerId,
    category: ScoreCategory
  ): number {
    return playerCategoryScore(playerId, category) || 0;
  }

  function playerCategoryScore(
    playerId: playerId,
    category: ScoreCategory
  ): number | null {
    return gameScore[playerId][category];
  }

  function yahtzeeBonusScore(playerId: playerId) {
    return playerCategoryScoreAsNumber(playerId, "yahtzeeBonus") * yahtzeeScore * 2;
  }

  function turnScoreForPlayer(playerId: playerId, category: ScoreCategory) {
    return category === 'yahtzeeBonus' ? playerCategoryScoreAsNumber(playerId, 'yahtzeeBonus') + 1 : getScoreOfCategory(category);
  }

  function fillCategory(playerId: playerId, category: ScoreCategory) {
    setGameScore((prev) => {
      const newScores = structuredClone(prev);
      const playerScores = newScores[playerId];

      newScores[playerId] = {
        ...playerScores,
        [category]: turnScoreForPlayer(playerId, category),
      };

      console.log(newScores);

      return newScores;
    });
  }

  function upperSectionTotals(id: playerId) {
    const subtotal =
      playerCategoryScoreAsNumber(id, "ones") +
      playerCategoryScoreAsNumber(id, "twos") +
      playerCategoryScoreAsNumber(id, "threes") +
      playerCategoryScoreAsNumber(id, "fours") +
      playerCategoryScoreAsNumber(id, "fives") +
      playerCategoryScoreAsNumber(id, "sixes");

    const bonus = subtotal >= 63 ? 35 : 0;

    const total = subtotal + bonus;

    return { subtotal, bonus, total };
  }

  function lowerSectionTotals(id: playerId) {
    const total =
      playerCategoryScoreAsNumber(id, "threeOfKind") +
      playerCategoryScoreAsNumber(id, "fourOfKind") +
      playerCategoryScoreAsNumber(id, "fullHouse") +
      playerCategoryScoreAsNumber(id, "smallStraight") +
      playerCategoryScoreAsNumber(id, "largeStraight") +
      playerCategoryScoreAsNumber(id, "yahtzee") +
      yahtzeeBonusScore(id) +
      playerCategoryScoreAsNumber(id, "chance");

    return total;
  }

  function grandTotal(id: playerId) {
    return upperSectionTotals(id).total + lowerSectionTotals(id);
  }

  function playerEndGame(playerId: playerId) {
    const playerScore = gameScore[playerId];

    return Object.values(playerScore).every(score => score !== null);
  }

  return {
    playerEndGame,
    fillCategory,
    turnScoreForPlayer,
    grandTotal,
    playerCategoryScore,
    playerCategoryScoreAsNumber,
    yahtzeeBonusScore,
    upperSectionTotals,
    lowerSectionTotals,
  };
};

export default usePlayerScore;
