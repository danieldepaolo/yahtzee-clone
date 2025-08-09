import { useAtomValue } from "jotai";
import cn from 'classnames';

import NameInput from "../NameInput";

import { gamePlayersAtom, turnAtom } from "../../store/atoms";

import classes from './cells.module.scss';

function PlayerHeaderCell({
  index,
  inputActive,
  onEnterName,
  setEnterNameIndex,
}: {
  index: number;
  inputActive: boolean;
  onEnterName: (index: number, name: string) => void;
  setEnterNameIndex: (index: number) => void;
}) {
  const gamePlayers = useAtomValue(gamePlayersAtom);
  const turn = useAtomValue(turnAtom);

  const player = gamePlayers[index];

  if (inputActive) {
    return (
      <th className={classes.compactCell}>
        <NameInput
          placeholder={`Player ${player?.id || index + 1}`}
          initialValue={player?.name || ""}
          onConfirm={(name) => onEnterName(index, name)}
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

export default PlayerHeaderCell;
