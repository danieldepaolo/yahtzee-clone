import { atom } from "jotai";

import { Die, dieId, GameTurn, Player, PlayerTurnOrder } from "../types";
import { defaultPlayerScores } from "../constants";

export const diceAtom = atom<Die[]>([
  {
    id: "die-1",
    value: 1,
  },
  {
    id: "die-2",
    value: 1,
  },
  {
    id: "die-3",
    value: 1,
  },
  {
    id: "die-4",
    value: 1,
  },
  {
    id: "die-5",
    value: 1,
  },
]);

export const selectedDiceAtom = atom<dieId[]>([]);

export const playerAtom = atom<Player>({
  name: '',
  scores: { ...defaultPlayerScores }
});

export const turnAtom = atom<GameTurn>({
  player: '',
  timesRolled: 0
});

export const turnOrderAtom = atom<PlayerTurnOrder>([]);

