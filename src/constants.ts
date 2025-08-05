import { PlayerScores } from "./types";

// 0 for a score means striking it
// null means blank
export const defaultPlayerScores: PlayerScores = {
  ones: null,
  twos: null,
  threes: null,
  fours: null,
  fives: null,
  sixes: null,

  threeOfKind: null,
  fourOfKind: null,
  fullHouse: null,
  smallStraight: null,
  largeStraight: null,
  yahtzee: null,
  chance: null
};

export const maxRolesPerTurn = 3;
