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
import PlayerTotalCells from "../SheetCells/PlayerTotalCells";
import CategoryLabelCell from "../SheetCells/CategoryLabelCell";

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
          <td className={classes.rightArrow}>&rarr;</td>
          <PlayerTotalCells
            players={gamePlayers}
            getTotal={(id) => upperSectionTotals(id).subtotal}
          />
        </tr>
        <tr>
          <td>
            <CategoryLabelCell title="Bonus" titleSize="large" description="If total score is 63 or over" />
          </td>
          <td className={cn(classes.cellLight, classes.howToScoreColumn)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              Score 35
            </span>
          </td>
          <PlayerTotalCells
            players={gamePlayers}
            getTotal={(id) => upperSectionTotals(id).bonus}
          />
        </tr>
        <tr className={classes.cellDark}>
          <td>
            <CategoryLabelCell title="Total" description="Of Upper Section" />
          </td>
          <td className={classes.rightArrow}>&rarr;</td>
          <PlayerTotalCells
            players={gamePlayers}
            getTotal={(id) => upperSectionTotals(id).total}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default UpperSection;
