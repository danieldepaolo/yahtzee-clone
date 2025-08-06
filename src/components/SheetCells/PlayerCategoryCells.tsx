import PlayerCategoryCell from "./PlayerCategoryCell";

import { maxNumPlayers } from "../../constants";
import { GamePlayers, ScoreCategory } from "../../types";

import classes from "./cells.module.scss";

const PlayerCategoryCells = ({
  players,
  category,
}: {
  players: GamePlayers;
  category: ScoreCategory;
}) => {
  return (
    <>
      {new Array(maxNumPlayers).fill(null).map((_, i) => {
        const player = players[i];

        return (
          <td
            key={`player-${category}-cell-${player?.name || i}`}
            className={classes.compactCell}
          >
            {player ? (
              <PlayerCategoryCell player={player} category={category} />
            ) : null}
          </td>
        );
      })}
    </>
  );
};

export default PlayerCategoryCells;
