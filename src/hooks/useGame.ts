import { useAtom } from "jotai";

import { gameScoreAtom, turnAtom, gamePlayersAtom } from "../store/atoms";
import { Player, ScoreCategory } from "../types";
import useTurnScore from "./useTurnScore";
import useDice from "./useDice";

const useGame = () => {
  const [gamePlayers, setGamePlayers] = useAtom(gamePlayersAtom);
  const [turn, setTurn] = useAtom(turnAtom);
  const [gameScore, setGameScore] = useAtom(gameScoreAtom);

  const { getScoreOfCategory } = useTurnScore();
  const { pickUpDice } = useDice()

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

  function fillCategory(category: ScoreCategory) {
    setGameScore((prev) => {
      const newScores = structuredClone(prev);
      const playerScores = newScores[turn.playerId];
      newScores[turn.playerId] = {
        ...playerScores,
        [category]: getScoreOfCategory(category),
      };
      return newScores;
    });

    moveToNextPlayer();
  }

  return {
    addPlayerOrEdit,
    fillCategory,
    moveToNextPlayer,
    incrementTurnRolls,
  };
};

export default useGame;
