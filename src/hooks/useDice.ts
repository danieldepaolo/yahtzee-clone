import { useAtom, useSetAtom } from "jotai";
import Roll from "roll";

import { diceAtom, selectedDiceAtom } from "../store/atoms";
import { dieId } from "../types";

const roll = new Roll();

const useDice = () => {
  const setDice = useSetAtom(diceAtom);
  const [selectedDice, setSelectedDice] = useAtom(selectedDiceAtom);

  function selectDies(...dieIds: dieId[]) {
    setSelectedDice((prev) => {
      const newSelectedDice = [...prev];

      dieIds.forEach((id) => {
        if (!newSelectedDice.includes(id)) {
          newSelectedDice.push(id);
        }
      });

      return newSelectedDice;
    });
  }

  function deselectDies(...dieIds: dieId[]) {
    setSelectedDice((prev) => prev.filter((id) => !dieIds.includes(id)));
  }

  function toggleDie(dieId: dieId) {
    if (selectedDice.includes(dieId)) {
      deselectDies(dieId);
    } else {
      selectDies(dieId);
    }
  }

  function resetSelectedDice() {
    setSelectedDice([]);
  }

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

  function pickUpDice() {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        value: null,
      }))
    );
  }

  return {
    toggleDie,
    resetSelectedDice,
    rollDice,
    rollAllDice,
    pickUpDice
  };
};

export default useDice;
