import { useAtomValue } from "jotai";

import SixSidedDie from "../SixSidedDie";

import useDice from "../../hooks/useDice";
import useGame from "../../hooks/useGame";
import { diceAtom, selectedDiceAtom, turnAtom } from "../../store/atoms";
import { Die, dieId } from "../../types";
import { maxRolesPerTurn } from "../../constants";
import classes from "./styles.module.scss";

const DiceArea = () => {
  const turn = useAtomValue(turnAtom);
  const selectedDice = useAtomValue(selectedDiceAtom);
  const dice = useAtomValue(diceAtom);

  const { incrementTurnRolls } = useGame();
  const { rollAllDice, rollDice, toggleDie, resetSelectedDice } = useDice();

  const rerollDisabled = !selectedDice?.length || turn.timesRolled === 3;

  const handleReroll = () => {
    rollDice(...selectedDice);
    incrementTurnRolls();
    resetSelectedDice();
  };

  const handleFirstRoll = () => {
    rollAllDice();
    incrementTurnRolls();
  };

  const handleSelectDie = (id: dieId) => {
    if (turn.timesRolled === 0 || turn.timesRolled === 3) return;

    toggleDie(id);
  };

  return (
    <div className={classes.diceArea}>
      <div className={classes.diceContainer}>
        {dice.map((die: Die) => (
          <div
            key={die.id}
            className={classes.dieContainer}
            onClick={() => handleSelectDie(die.id)}
          >
            <SixSidedDie
              value={die.value}
              selected={selectedDice.includes(die.id)}
            />
          </div>
        ))}
      </div>
      <p>{`Rolls: ${turn.timesRolled} / ${maxRolesPerTurn}`}</p>
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
