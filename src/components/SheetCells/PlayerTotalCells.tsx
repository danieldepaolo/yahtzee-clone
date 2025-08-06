import cn from "classnames";

import { maxNumPlayers } from "../../constants";
import { GamePlayers, playerId } from "../../types";

import classes from "./cells.module.scss";

const PlayerTotalCells = ({
  players,
  getTotal,
}: {
  players: GamePlayers;
  getTotal: (id: playerId) => number;
}) => {
  return (
    <>
      {new Array(maxNumPlayers).fill(null).map((_, i) => {
        const player = players[i];

        return (
          <td key={`player-total-cell-${player?.name || i}`}>
            <div className={cn(classes.playerDataCell, classes.textBold)}>
              {player ? getTotal(player.id) : null}
            </div>
          </td>
        );
      })}
    </>
  );
};

export default PlayerTotalCells;
