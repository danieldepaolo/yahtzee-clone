import { useAtomValue } from "jotai";

import { diceAtom } from "../store/atoms";
import { ScoreCategory } from "../types";

const useTurnScore = () => {
  const dice = useAtomValue(diceAtom);

  const diceArePickedUp = dice.some((die) => die.value === null);

  const diceCounts = !diceArePickedUp
    ? dice.reduce((acc, curr) => {
        if (curr.value! in acc) {
          acc[curr.value!] += 1;
        } else {
          acc[curr.value!] = 1;
        }

        return acc;
      }, {} as Record<number, number>)
    : {};

  const totalDiceValue = dice.reduce((acc, curr) => acc + (curr.value || 0), 0);

  function hasNOfKind(n: number, exact: boolean = false) {
    return !!Object.entries(diceCounts).find((entry) =>
      exact ? entry[1] === n : entry[1] >= n
    );
  }

  function hasStraightOfLength(length: number, start: number = 0): boolean {
    if (diceArePickedUp) {
      return false;
    }

    const sortedDice = [
      ...new Set(dice.map((die) => die.value!).sort((a, b) => a - b)),
    ];
    console.log(sortedDice);

    let isStraight = true;

    for (let i = start + 1; i < start + length; i++) {
      if (sortedDice[i] !== sortedDice[i - 1] + 1) {
        isStraight = false;
        break;
      }
    }

    return isStraight;
  }

  function singleValueScore(value: number) {
    const count = diceCounts[value] || 0;
    return count * value;
  }

  function threeOfKindScore() {
    return hasNOfKind(3) ? totalDiceValue : 0;
  }

  function fourOfKindScore() {
    return hasNOfKind(4) ? totalDiceValue : 0;
  }

  function yahtzeeScore() {
    return hasNOfKind(5) ? 50 : 0;
  }

  function fullHouseScore() {
    return hasNOfKind(3, true) && hasNOfKind(2, true) ? 25 : 0;
  }

  function smallStraightScore() {
    const hasSmallStraight =
      hasStraightOfLength(4, 0) || hasStraightOfLength(4, 1);

    return hasSmallStraight ? 30 : 0;
  }

  function largeStraightScore() {
    const hasLargeStraight = hasStraightOfLength(5);

    return hasLargeStraight ? 40 : 0;
  }

  function chanceScore() {
    return totalDiceValue;
  }

  function getScoreOfCategory(category: ScoreCategory) {
    switch (category) {
      case "ones":
        return singleValueScore(1);
      case "twos":
        return singleValueScore(2);
      case "threes":
        return singleValueScore(3);
      case "fours":
        return singleValueScore(4);
      case "fives":
        return singleValueScore(5);
      case "sixes":
        return singleValueScore(6);
      case "threeOfKind":
        return threeOfKindScore();
      case "fourOfKind":
        return fourOfKindScore();
      case "fullHouse":
        return fullHouseScore();
      case "smallStraight":
        return smallStraightScore();
      case "largeStraight":
        return largeStraightScore();
      case "yahtzee":
        return yahtzeeScore();
      case "chance":
      default:
        return chanceScore();
    }
  }

  return {
    getScoreOfCategory,
  };
};

export default useTurnScore;
