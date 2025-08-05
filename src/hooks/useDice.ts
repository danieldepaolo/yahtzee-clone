import { useSetAtom } from "jotai";
import Roll from "roll";

import { diceAtom } from "../store/atoms";
import { dieId } from "../types";

const roll = new Roll();

const useDice = () => {
  const setDice = useSetAtom(diceAtom);

  function rollDice(...diceIds: dieId[]) {
    setDice((prev) => {
      const newDice = prev.map((die) => ({
        ...die,
        value: diceIds.includes(die.id) ? roll.roll("1d6").result : die.value,
      }));

      return newDice;
    });
  }

  function rollAllDice() {
    rollDice("die-1", "die-2", "die-3", "die-4", "die-5");
  }

  return {
    rollDice,
    rollAllDice,
  };
};

export default useDice;
