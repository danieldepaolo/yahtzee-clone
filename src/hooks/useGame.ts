import { useAtom, useSetAtom } from "jotai";

import { turnAtom, gamePlayersAtom, gameStageAtom, gameWinnerAtom } from "../store/atoms";
import { Player, ScoreCategory } from "../types";
import useDice from "./useDice";
import usePlayerScore from "./usePlayerScore";
import { useEffect } from "react";

const useGame = () => {
  const [gamePlayers, setGamePlayers] = useAtom(gamePlayersAtom);
  const [turn, setTurn] = useAtom(turnAtom);
  const [gameStage, setGameStage] = useAtom(gameStageAtom);
  const setGameWinner = useSetAtom(gameWinnerAtom);

  const { turnScoreForPlayer, fillCategory, playerEndGame, grandTotal } = usePlayerScore();
  const { pickUpDice } = useDice();

  useEffect(() => {
    if (gameEnd()) {
      setGameWinner(getWinner());
      setGameStage('gameOver');
    }
  }, [turn])

  function currentPlayerIndex(): number {
    return gamePlayers.findIndex(player => player.id === turn.playerId);
  }

  function currentPlayer(): Player | null {
    const playerIndex = currentPlayerIndex();
    return playerIndex !== -1 ? gamePlayers[playerIndex] : null;
  }

  function moveToNextPlayer() {
    const playerIndex = currentPlayerIndex();

    let nextIndex = playerIndex + 1;
    if (nextIndex === gamePlayers.length) {
      nextIndex = 0;
    }

    setTurn({
      playerId: gamePlayers[nextIndex].id,
      pendingCategory: null,
      pendingScore: null,
      timesRolled: 0,
    });

    pickUpDice();
  }

  function addPlayerOrEdit(player: Player) {
    const playerIndex = gamePlayers.findIndex(
      (existing) => existing.id === player.id
    );

    if (playerIndex === -1) {
      setGamePlayers((prev) => [...prev, player]);
    } else {
      setGamePlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[playerIndex] = {
          ...player,
        };
        return newPlayers;
      });
    }
  }

  function incrementTurnRolls() {
    setTurn((prev) => ({
      ...prev,
      timesRolled: prev.timesRolled + 1,
    }));
  }

  function setPendingMove(category: ScoreCategory) {
    if (category !== turn.pendingCategory) {
      console.log(category, turn.pendingCategory);
      setTurn((prev) => ({
        ...prev,
        pendingCategory: category,
        pendingScore: turnScoreForPlayer(prev.playerId, category),
      }));
    }
  }

  function makeMove(category: ScoreCategory) {
    // Make sure they clicked on the pending category again
    if (category === turn.pendingCategory) {
      fillCategory(turn.playerId, category);
      moveToNextPlayer();
    }
  }

  function gameEnd(): boolean {
    return gameStage !== 'enterNames' && gamePlayers.every(player => playerEndGame(player.id));
  }

  function getWinner(): Player {
    let winner = { ...gamePlayers[0] };

    for (let i = 1; i < gamePlayers.length; i++) {
      if (grandTotal(gamePlayers[i].id) > grandTotal(winner.id)) {
        winner = { ...gamePlayers[i] };
      }
    }

    return winner;
  }

  return {
    gameEnd,
    setPendingMove,
    currentPlayer,
    makeMove,
    addPlayerOrEdit,
    moveToNextPlayer,
    incrementTurnRolls,
  };
};

export default useGame;
