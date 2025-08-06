import { useState } from "react";
import cn from "classnames";
import { useAtomValue } from "jotai";

import PlayerCategoryCells from "../SheetCells/PlayerCategoryCells";
import PlayerHeaderCell from "../SheetCells/PlayerHeaderCell";

import useGame from "../../hooks/useGame";
import usePlayerScore from "../../hooks/usePlayerScore";
import { gamePlayersAtom, gameStageAtom, turnAtom } from "../../store/atoms";
import { Player } from "../../types";

import classes from "./styles.module.scss";

const UpperSection = () => {
  const gamePlayers = useAtomValue(gamePlayersAtom);
  const gameStage = useAtomValue(gameStageAtom);
  const turn = useAtomValue(turnAtom);

  const [enterNameIndex, setEnterNameIndex] = useState<number | null>(
    gamePlayers.length
  );

  const { addPlayerOrEdit } = useGame();
  const { upperSectionTotals } = usePlayerScore();

  const handleAddOrEditPlayer = (index: number, name: string) => {
    const player: Player = {
      id: gamePlayers[index]?.id || index + 1,
      name,
    };

    addPlayerOrEdit(player);
    setEnterNameIndex(null);
  };

  return (
    <table className={classes.upperSection}>
      <thead>
        <tr className={classes.cellDark}>
          <th className={cn(classes.headingLarge, classes.leftColumn)}>
            Upper Section
          </th>
          <th className={cn(classes.headingLarge, classes.howToScoreColumn)}>
            How To Score
          </th>
          {new Array(6).fill(null).map((_, i) => (
            <PlayerHeaderCell
              key={`player-header-cell-${i}`}
              index={i}
              inputActive={gameStage === "enterNames" && i === enterNameIndex}
              onEnterName={handleAddOrEditPlayer}
              setEnterNameIndex={setEnterNameIndex}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className={classes.headingSmall}>Aces</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Aces</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="ones" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Twos</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Twos</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="twos" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Threes</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Threes</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="threes" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Fours</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Fours</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="fours" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Fives</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Fives</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="fives" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Sixes</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Sixes</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="sixes" />
        </tr>
        <tr className={classes.cellDark}>
          <td>
            <span className={classes.headingLarge}>Total</span>
          </td>
          <td>&rarr;</td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td key={`player-total-cell-${player?.name || i}`}>
                <div className={cn(classes.playerDataCell, classes.textBold)}>
                  {player ? upperSectionTotals(player.id).subtotal : null}
                </div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td>
            <div className={classes.titleWithDescription}>
              <span className={classes.headingLarge}>Bonus</span>
              <span className={classes.textTiny}>
                <div>If total score</div>
                <div>is 63 or over</div>
              </span>
            </div>
          </td>
          <td className={cn(classes.cellLight, classes.howToScoreColumn)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              Score 35
            </span>
          </td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td key={`player-bonus-cell-${player?.name || i}`}>
                <div className={cn(classes.playerDataCell, classes.textBold)}>
                  {player ? upperSectionTotals(player.id).bonus : null}
                </div>
              </td>
            );
          })}
        </tr>
        <tr className={classes.cellDark}>
          <td>
            <div className={classes.titleWithDescription}>
              <span className={classes.headingLarge}>Total</span>
              <span className={classes.textTiny}>
                <div>Of Upper</div>
                <div>Section</div>
              </span>
            </div>
          </td>
          <td>&rarr;</td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td key={`player-total-cell-${player?.name || i}`}>
                <div className={cn(classes.playerDataCell, classes.textBold)}>
                  {player ? upperSectionTotals(player.id).total : null}
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default UpperSection;
