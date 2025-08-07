export type dieId = "die-1" | "die-2" | "die-3" | "die-4" | "die-5";
export type playerId = 1 | 2 | 3 | 4 | 5 | 6;

export interface Die {
  id: dieId;
  value: number | null;
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
  yahtzeeBonus: number
  chance: number | null
}

export type ScoreCategory = keyof PlayerScores;

export interface Player {
  id: playerId
  name: string
}

export interface GameTurn {
  playerId: playerId
  timesRolled: number
}

export type GamePlayers = Player[];

export type GameScore = Record<playerId, PlayerScores>

export type GameStage = 'enterNames' | 'inProgress' | 'gameOver';
