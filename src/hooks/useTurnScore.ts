import { useAtomValue } from "jotai";

import { diceAtom } from "../store/atoms";

const useTurnScore = () => {
  const dice = useAtomValue(diceAtom);

  const diceCounts = dice.reduce((acc, curr) => {
    if (curr.value in acc) {
      acc[curr.value] += 1;
    } else {
      acc[curr.value] = 1;
    }

    return acc;
  }, {} as Record<number, number>);

  const totalDiceValue = dice.reduce((acc, curr) => acc + curr.value, 0);

  function hasNOfKind(n: number, exact: boolean = false) {
    return !!Object.entries(diceCounts).find((entry) =>
      exact ? entry[1] === n : entry[1] >= n
    );
  }

  function hasStraightOfLength(length: number, start: number = 0) {
    const sortedDice = dice.map((die) => die.value).sort((a, b) => a - b);

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
    const count = diceCounts[value];
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

  function hasSmallStraight() {
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
};

export default useTurnScore;
