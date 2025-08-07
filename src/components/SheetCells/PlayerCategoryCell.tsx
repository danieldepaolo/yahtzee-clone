import { useAtomValue } from "jotai";
import cn from "classnames";

import { Player, ScoreCategory } from "../../types";
import { turnAtom } from "../../store/atoms";
import useGame from "../../hooks/useGame";

import classes from "./cells.module.scss";
import usePlayerScore from "../../hooks/usePlayerScore";

const PlayerCategoryCell = ({
  player,
  category,
}: {
  player: Player;
  category: ScoreCategory;
}) => {
  const turn = useAtomValue(turnAtom);

  const currentTurn = turn.playerId === player.id;

  const { makeMove } = useGame();
  const { playerCategoryScore } = usePlayerScore();

  const score = playerCategoryScore(player.id, category);
  const ableToScore = currentTurn && score === null && turn.timesRolled > 0;
  const inPendingMode = turn.pendingCategory === category;

  const handleClickCell = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent click away listener on app from firing. That listener cancels the pending score.
    makeMove(category);
  };

  return (
    <div
      className={cn(classes.playerDataCell, {
        [classes.playerDataCellCurrent]: ableToScore,
      })}
    >
      {ableToScore ? (
        <button
          onClick={handleClickCell}
          disabled={!ableToScore}
          className={cn(classes.playerFillCategoryButton, {
            [classes.playerFillCategoryButtonPending]: inPendingMode,
          })}
        >
          {inPendingMode ? turn.pendingScore : score}
        </button>
      ) : (
        <>{score}</>
      )}
    </div>
  );
};

export default PlayerCategoryCell;
