import { useAtomValue } from "jotai";

import SixSidedDie from "../SixSidedDie";

import useDice from "../../hooks/useDice";
import useGame from "../../hooks/useGame";
import { diceAtom, selectedDiceAtom, turnAtom } from "../../store/atoms";
import { Die } from "../../types";
import { maxRolesPerTurn } from "../../constants";

const DiceArea = () => {
  const turn = useAtomValue(turnAtom);
  const selectedDice = useAtomValue(selectedDiceAtom);
  const dice = useAtomValue(diceAtom);

  const { incrementTurnRolls } = useGame();
  const { rollAllDice, rollDice } = useDice();

  const rerollDisabled = !selectedDice?.length || turn.timesRolled === 3;

  const handleReroll = () => {
    rollDice(...selectedDice);
    incrementTurnRolls();
  };

  const handleFirstRoll = () => {
    rollAllDice();
    incrementTurnRolls();
  };

  return (
    <div className="dice-area">
      {dice.map((die: Die) => (
        <SixSidedDie key={die.id} value={die.value} />
      ))}
      <p>{`Roll ${turn.timesRolled + 1} / ${maxRolesPerTurn}`}</p>
      {turn.timesRolled === 0 ? (
        <button onClick={handleFirstRoll}>Roll</button>
      ) : (
        <button onClick={handleReroll} disabled={rerollDisabled}>
          Reroll
        </button>
      )}
    </div>
  );
};

export default DiceArea;
