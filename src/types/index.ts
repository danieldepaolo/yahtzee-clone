export type dieId = "die-1" | "die-2" | "die-3" | "die-4" | "die-5";

export interface Die {
  id: dieId;
  value: number;
}

// 0 for a score means striking it
// null means blank
export interface PlayerScores {
  ones: number | null
  twos: number | null
  threes: number | null
  fours: number | null
  fives: number | null
  sixes: number | null

  threeOfKind: number | null
  fourOfKind: number | null
  fullHouse: number | null
  smallStraight: number | null
  largeStraight: number | null
  yahtzee: number | null
  chance: number | null
}

export interface Player {
  name: string
  scores: PlayerScores
}

export interface GameTurn {
  player: string
  timesRolled: number
}

export type PlayerTurnOrder = string[];
