import cn from "classnames";
import { useAtomValue } from "jotai";

import { GamePlayers } from "../../types";
import {
  maxNumPlayers,
  yahtzeeBonusCount,
  yahtzeeScore,
} from "../../constants";
import useTurnScore from "../../hooks/useTurnScore";
import { gameScoreAtom, turnAtom } from "../../store/atoms";

import classes from "./cells.module.scss";
import useGame from "../../hooks/useGame";

const YahtzeeBonusCells = ({ players }: { players: GamePlayers }) => {
  const turn = useAtomValue(turnAtom);
  const scores = useAtomValue(gameScoreAtom);

  const { addYahtzeeBonus } = useGame();
  const { getScoreOfCategory } = useTurnScore();

  const hasYahtzee = getScoreOfCategory("yahtzee") === yahtzeeScore;

  return (
    <>
      {new Array(maxNumPlayers).fill(null).map((_, i) => {
        const player = players[i];
        if (!player) {
          return <td key={`player-yahtzee-bonus-cell-${i}`}></td>;
        }

        const currentTurn = turn.playerId === player.id;

        // Dice are yahtzee and player already has a yahtzee scored
        const yahtzeeBonusEligible =
          hasYahtzee && scores[player.id].yahtzee === yahtzeeScore;
        const numYahtzeeBonuses = scores[player.id].yahtzeeBonus;

        return (
          <td key={`player-yahtzee-bonus-cell-${player.name}-${i}`}>
            <div
              className={cn(classes.playerDataCell, {
                [classes.playerDataCellCurrent]:
                  currentTurn && yahtzeeBonusEligible,
              })}
            >
              {new Array(yahtzeeBonusCount).fill(null).map((_, i) => (
                <div key={`bonus-slot-${player.name}-${i}`} className={classes.splitCellThirds}>
                  <button
                    onClick={addYahtzeeBonus}
                    disabled={!yahtzeeBonusEligible || i !== numYahtzeeBonuses}
                    className={classes.playerFillCategoryButton}
                  >
                    {i < numYahtzeeBonuses ? "X" : ""}
                  </button>
                </div>
              ))}
            </div>
          </td>
        );
      })}
    </>
  );
};

export default YahtzeeBonusCells;
