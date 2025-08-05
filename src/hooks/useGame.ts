import { useAtom, useSetAtom } from "jotai";

import { selectedDiceAtom, turnAtom, turnOrderAtom } from "../store/atoms";
import { dieId } from "../types";

const useGame = () => {
  const [turnOrder, setTurnOrder] = useAtom(turnOrderAtom);
  const [turn, setTurn] = useAtom(turnAtom);
  const setSelectedDice = useSetAtom(selectedDiceAtom);

  function selectDies(...dieIds: dieId[]) {
    setSelectedDice(prev => {
      const newSelectedDice = [...prev];

      dieIds.forEach(id => {
        if (!newSelectedDice.includes(id)) {
          newSelectedDice.push(id);
        }
      });

      return newSelectedDice;
    });
  }

  function deselectDies(...dieIds: dieId[]) {
    setSelectedDice(prev => prev.filter(id => !dieIds.includes(id)));
  }

  function moveToNextPlayer() {
    const currentOrder = turnOrder.findIndex(name => name === turn.player);

    let nextIndex = currentOrder + 1;
    if (nextIndex === turnOrder.length) {
      nextIndex = 0;
    }

    setTurn({
      player: turnOrder[nextIndex],
      timesRolled: 0
    });
  }

  function incrementTurnRolls() {
    setTurn((prev) => ({
      ...prev,
      timesRolled: prev.timesRolled + 1,
    }));
  }

  return {
    setTurnOrder,
    moveToNextPlayer,
    incrementTurnRolls,
    selectDies,
    deselectDies
  }
}

export default useGame;
