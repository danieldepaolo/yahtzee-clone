import { useAtomValue } from "jotai";
import cn from "classnames";

import PlayerCategoryCells from "../SheetCells/PlayerCategoryCells";
import PlayerTotalCells from "../SheetCells/PlayerTotalCells";

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

const LowerSection = () => {
  const gamePlayers = useAtomValue(gamePlayersAtom);

  const { lowerSectionTotals, upperSectionTotals, grandTotal } =
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
            <div className={classes.titleWithDescription}>
              <span className={classes.headingSmall}>SM Straight</span>
              <span className={classes.textTiny}>
                <div>Sequence</div>
                <div>of 4</div>
              </span>
            </div>
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
            <div className={classes.titleWithDescription}>
              <span className={classes.headingSmall}>LG Straight</span>
              <span className={classes.textTiny}>
                <div>Sequence</div>
                <div>of 5</div>
              </span>
            </div>
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
            <div className={classes.titleWithDescription}>
              <span className={cn(classes.headingSmall, classes.textUpper)}>
                Yahtzee
              </span>
              <span className={classes.textTiny}>
                <div>5 of</div>
                <div>a Kind</div>
              </span>
            </div>
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
          <PlayerCategoryCells players={gamePlayers} category="fullHouse" />
        </tr>
        <tr className={classes.cellDark}>
          <td>
            <div className={classes.titleWithDescription}>
              <span className={classes.headingLarge}>Total</span>
              <span className={classes.textTiny}>
                <div>Of Lower</div>
                <div>Section</div>
              </span>
            </div>
          </td>
          <td>&rarr;</td>
          <PlayerTotalCells
            players={gamePlayers}
            getTotal={lowerSectionTotals}
          />
        </tr>
        <tr>
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
          <td>&rarr;</td>
          <PlayerTotalCells players={gamePlayers} getTotal={grandTotal} />
        </tr>
      </tbody>
    </table>
  );
};

export default LowerSection;
