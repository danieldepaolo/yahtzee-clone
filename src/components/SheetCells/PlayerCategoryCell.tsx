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

  const { fillCategory } = useGame();
  const { playerCategoryScore } = usePlayerScore();

  const score = playerCategoryScore(player.id, category);
  const ableToScore = !score && turn.timesRolled > 0;

  const handleClickCell = () => {
    fillCategory(category);
  }

  return (
    <div
      className={cn(classes.playerDataCell, {
        [classes.playerDataCellCurrent]: currentTurn && !score,
      })}
    >
      {currentTurn ? (
        <button onClick={handleClickCell} disabled={!ableToScore} className={classes.playerFillCategoryButton}>{score}</button>
      ) : (
        <>{score}</>
      )}
    </div>
  );
};

export default PlayerCategoryCell;
