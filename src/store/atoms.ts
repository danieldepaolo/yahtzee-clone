import { atom } from "jotai";

import {
  Die,
  dieId,
  GameScore,
  GameTurn,
  GamePlayers,
  GameStage,
} from "../types";
import { defaultPlayerScores } from "../constants";

export const diceAtom = atom<Die[]>([
  {
    id: "die-1",
    value: null,
  },
  {
    id: "die-2",
    value: null,
  },
  {
    id: "die-3",
    value: null,
  },
  {
    id: "die-4",
    value: null,
  },
  {
    id: "die-5",
    value: null,
  },
]);

export const selectedDiceAtom = atom<dieId[]>([]);

export const turnAtom = atom<GameTurn>({
  playerId: 1,
  pendingCategory: null,
  pendingScore: null,
  timesRolled: 0,
});

export const gamePlayersAtom = atom<GamePlayers>([]);

export const gameScoreAtom = atom<GameScore>({
  1: { ...defaultPlayerScores },
  2: { ...defaultPlayerScores },
  3: { ...defaultPlayerScores },
  4: { ...defaultPlayerScores },
  5: { ...defaultPlayerScores },
  6: { ...defaultPlayerScores }
});

export const gameStageAtom = atom<GameStage>("enterNames");
