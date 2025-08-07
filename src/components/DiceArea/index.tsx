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

  const turnOver = turn.timesRolled === 3;
  const rerollDisabled = !selectedDice?.length || turnOver;

  const handleReroll = () => {
    rollDice(...selectedDice);
    incrementTurnRolls();
    resetSelectedDice();
  };

  const handleRollAll = () => {
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
        {dice
          .filter((die) => !!die.value)
          .map((die: Die) => (
            <div
              key={die.id}
              className={classes.dieContainer}
              onClick={() => handleSelectDie(die.id)}
            >
              <SixSidedDie
                value={die.value!}
                selected={selectedDice.includes(die.id)}
              />
            </div>
          ))}
      </div>
      <div className={classes.diceInfo}>
        <p
          className={classes.diceInfoNumRolls}
        >{`Times thrown: ${turn.timesRolled} / ${maxRolesPerTurn}`}</p>
        <button
          className="roll-button"
          onClick={handleReroll}
          disabled={rerollDisabled}
        >
          Reroll Selected
        </button>
        <button
          className="roll-button"
          onClick={handleRollAll}
          disabled={turnOver}
        >
          Roll All
        </button>
      </div>
    </div>
  );
};

export default DiceArea;
