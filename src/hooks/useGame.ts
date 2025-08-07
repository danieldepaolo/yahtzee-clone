import { useAtom } from "jotai";

import { turnAtom, gamePlayersAtom } from "../store/atoms";
import { Player, ScoreCategory } from "../types";
import useDice from "./useDice";
import usePlayerScore from "./usePlayerScore";

const useGame = () => {
  const [gamePlayers, setGamePlayers] = useAtom(gamePlayersAtom);
  const [turn, setTurn] = useAtom(turnAtom);

  const { turnScoreForPlayer, fillCategory } = usePlayerScore();
  const { pickUpDice } = useDice();

  function moveToNextPlayer() {
    const currentOrder = gamePlayers.findIndex(
      (player) => player.id === turn.playerId
    );

    let nextIndex = currentOrder + 1;
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

  function makeMove(category: ScoreCategory) {
    if (!turn.pendingCategory) {
      setTurn(prev => ({
        ...prev,
        pendingCategory: category,
        pendingScore: turnScoreForPlayer(turn.playerId, category)
      }));

      return;
    }

    fillCategory(turn.playerId, category);
    moveToNextPlayer();
  }

  return {
    makeMove,
    addPlayerOrEdit,
    moveToNextPlayer,
    incrementTurnRolls,
  };
};

export default useGame;
