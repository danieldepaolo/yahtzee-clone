import { useAtomValue } from "jotai";
import cn from "classnames";

import PlayerCategoryCells from "../SheetCells/PlayerCategoryCells";
import PlayerTotalCells from "../SheetCells/PlayerTotalCells";
import YahtzeeBonusCells from "../SheetCells/YahtzeeBonusCells";

import usePlayerScore from "../../hooks/usePlayerScore";
import { gamePlayersAtom } from "../../store/atoms";
import {
  fullHouseScore,
  largeStraightScore,
  maxNumPlayers,
  smallStraightScore,
  yahtzeeScore,
} from "../../constants";

import classes from "./styles.module.scss";
import CategoryLabelCell from "../SheetCells/CategoryLabelCell";

const LowerSection = () => {
  const gamePlayers = useAtomValue(gamePlayersAtom);

  const { lowerSectionTotals, upperSectionTotals, grandTotal, yahtzeeBonusScore } =
    usePlayerScore();

  return (
    <table className={classes.lowerSection}>
      <thead>
        <tr>
          <th
            style={{ borderTop: "1px solid black" }}
            className={cn(
              classes.headingLarge,
              classes.leftColumn,
              classes.cellDark
            )}
          >
            Lower Section
          </th>
          {new Array(maxNumPlayers + 1).fill(null).map((_, i) => (
            <th
              key={`filler-header-cell-${i}`}
              style={{ borderRight: "none" }}
            ></th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className={classes.headingSmall}>3 of a Kind</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Add total</div>
              <div>of all dice</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="threeOfKind" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>4 of a Kind</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Add total</div>
              <div>of all dice</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="fourOfKind" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Full House</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              Score {fullHouseScore}
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="fullHouse" />
        </tr>
        <tr>
          <td>
            <CategoryLabelCell title="SM Straight" titleSize="small" description="Sequence of 4" />
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              Score {smallStraightScore}
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="smallStraight" />
        </tr>
        <tr>
          <td>
            <CategoryLabelCell title="LG Straight" titleSize="small" description="Sequence of 5" />
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              Score {largeStraightScore}
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="largeStraight" />
        </tr>
        <tr>
          <td>
            <CategoryLabelCell title="Yahtzee" titleSize="small" description="5 of a Kind" />
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              Score {yahtzeeScore}
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="yahtzee" />
        </tr>
        <tr>
          <td>
            <span className={classes.headingSmall}>Chance</span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={classes.textSmall}>
              <div>Score total</div>
              <div>of all dice</div>
            </span>
          </td>
          <PlayerCategoryCells players={gamePlayers} category="chance" />
        </tr>
        <tr>
          <td rowSpan={2} className={cn(classes.textCentered, classes.cellDark)}>
            <span className={classes.headingLarge}>
              <div>Yahtzee</div>
              <div className={classes.textHuge}>Bonus</div>
            </span>
          </td>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              <div>X For</div>
              <div>Each Bonus</div>
            </span>
          </td>
          <YahtzeeBonusCells players={gamePlayers} />
        </tr>
        <tr>
          <td className={cn(classes.howToScoreColumn, classes.cellLight)}>
            <span className={cn(classes.textSmall, classes.textUpper)}>
              <div>Score 100</div>
              <div>Per X</div>
            </span>
          </td>
          <PlayerTotalCells players={gamePlayers} getTotal={yahtzeeBonusScore} />
        </tr>
        <tr className={classes.cellDark}>
          <td>
            <CategoryLabelCell title="Total" description="Of Lower Section" />
          </td>
          <td className={classes.rightArrow}>&rarr;</td>
          <PlayerTotalCells
            players={gamePlayers}
            getTotal={lowerSectionTotals}
          />
        </tr>
        <tr>
          <td>
            <CategoryLabelCell title="Total" description="Of Upper Section" />
          </td>
          <td className={classes.rightArrow}>&rarr;</td>
          <PlayerTotalCells
            players={gamePlayers}
            getTotal={(id) => upperSectionTotals(id).total}
          />
        </tr>
        <tr className={classes.cellDark}>
          <td>
            <div className={classes.titleWithDescription}>
              <span className={classes.headingLarge}>Grand Total</span>
            </div>
          </td>
          <td className={classes.rightArrow}>&rarr;</td>
          <PlayerTotalCells players={gamePlayers} getTotal={grandTotal} />
        </tr>
      </tbody>
    </table>
  );
};

export default LowerSection;
