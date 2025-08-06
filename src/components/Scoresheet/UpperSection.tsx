import { ReactElement, useState } from "react";
import cn from "classnames";
import { useAtomValue } from "jotai";

import NameInputCell from "./NameInputCell";

import useGame from "../../hooks/useGame";
import { gamePlayersAtom, gameStageAtom, turnAtom } from "../../store/atoms";
import classes from "./styles.module.scss";
import { Player } from "../../types";
import PlayerCategoryCell from "./PlayerCategoryCell";
import usePlayerScore from "../../hooks/usePlayerScore";

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

  function playerHeaderCell(index: number): ReactElement {
    const player = gamePlayers[index];

    if (gameStage === "enterNames" && index === enterNameIndex) {
      return (
        <th key={`enter-name-${index}`}>
          <NameInputCell
            placeholder={`Player ${index + 1}`}
            initialValue={player?.name || ""}
            onConfirm={(name) => handleAddOrEditPlayer(index, name)}
          />
        </th>
      );
    } else {
      return (
        <th
          key={`${player?.name}-${index}` || `empty-name-${index}`}
          onClick={() => setEnterNameIndex(index)}
          className={cn(classes.playerHeaderCell, {
            [classes.playerHeaderCellCurrent]: player?.id === turn.playerId,
          })}
        >
          {player?.name || ""}
        </th>
      );
    }
  }

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
          {new Array(6).fill(null).map((_, i) => playerHeaderCell(i))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className={classes.headingSmall}>Aces</span>
          </td>
          <td
            className={cn(
              classes.howToScoreColumn,
              classes.cellLight,
              classes.compactCell
            )}
          >
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Aces</div>
            </span>
          </td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td
                key={`player-aces-cell-${player?.name || i}`}
                className={classes.compactCell}
              >
                {player ? (
                  <PlayerCategoryCell player={player} category="ones" />
                ) : null}
              </td>
            );
          })}
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Twos</span>
          </td>
          <td
            className={cn(
              classes.howToScoreColumn,
              classes.cellLight,
              classes.compactCell
            )}
          >
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Twos</div>
            </span>
          </td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td
                key={`player-twos-cell-${player?.name || i}`}
                className={classes.compactCell}
              >
                {player ? (
                  <PlayerCategoryCell player={player} category="twos" />
                ) : null}
              </td>
            );
          })}
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Threes</span>
          </td>
          <td
            className={cn(
              classes.howToScoreColumn,
              classes.cellLight,
              classes.compactCell
            )}
          >
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Threes</div>
            </span>
          </td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td
                key={`player-threes-cell-${player?.name || i}`}
                className={classes.compactCell}
              >
                {player ? (
                  <PlayerCategoryCell player={player} category="threes" />
                ) : null}
              </td>
            );
          })}
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Fours</span>
          </td>
          <td
            className={cn(
              classes.howToScoreColumn,
              classes.cellLight,
              classes.compactCell
            )}
          >
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Fours</div>
            </span>
          </td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td
                key={`player-fours-cell-${player?.name || i}`}
                className={classes.compactCell}
              >
                {player ? (
                  <PlayerCategoryCell player={player} category="fours" />
                ) : null}
              </td>
            );
          })}
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Fives</span>
          </td>
          <td
            className={cn(
              classes.howToScoreColumn,
              classes.cellLight,
              classes.compactCell
            )}
          >
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Fives</div>
            </span>
          </td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td
                key={`player-fives-cell-${player?.name || i}`}
                className={classes.compactCell}
              >
                {player ? (
                  <PlayerCategoryCell player={player} category="fives" />
                ) : null}
              </td>
            );
          })}
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Sixes</span>
          </td>
          <td
            className={cn(
              classes.howToScoreColumn,
              classes.cellLight,
              classes.compactCell
            )}
          >
            <span className={classes.textSmall}>
              <div>Count and add</div>
              <div>only Sixes</div>
            </span>
          </td>
          {new Array(6).fill(null).map((_, i) => {
            const player = gamePlayers[i];

            return (
              <td
                key={`player-sixes-cell-${player?.name || i}`}
                className={classes.compactCell}
              >
                {player ? (
                  <PlayerCategoryCell player={player} category="sixes" />
                ) : null}
              </td>
            );
          })}
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
          <td
            className={cn(
              classes.cellLight,
              classes.howToScoreColumn,
              classes.compactCell
            )}
          >
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
