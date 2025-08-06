import { PlayerScores, ScoreCategory } from "./types";

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

export const scoreCategoryOrder: ScoreCategory[] = [
  'ones',
  'twos',
  'threes',
  'fours',
  'fives',
  'sixes',
  'threeOfKind',
  'fourOfKind',
  'fullHouse',
  'smallStraight',
  'largeStraight',
  'yahtzee',
  'chance'
];

export const maxRolesPerTurn = 3;
export const maxNumPlayers = 6;