import { useAtom, useAtomValue, useSetAtom } from "jotai";

import DiceArea from "./components/DiceArea";
import Scoresheet from "./components/Scoresheet";

import useGame from "./hooks/useGame";
import { gamePlayersAtom, gameStageAtom, gameWinnerAtom, turnAtom } from "./store/atoms";
import "./styles/app.scss";


export function App() {
  const [gameStage, setGameStage] = useAtom(gameStageAtom);
  const players = useAtomValue(gamePlayersAtom);
  const setTurn = useSetAtom(turnAtom);
  const winner = useAtomValue(gameWinnerAtom);

  const { currentPlayer } = useGame();

  const ableToStartGame = gameStage === "enterNames" && players.length > 0;

  const handleStartGame = () => {
    if (ableToStartGame) {
      setGameStage("inProgress");
    }
  };

  const gameMessage = () => {
    switch(gameStage) {
      case 'enterNames':
        return "Welcome! Please enter player names in the score sheet.";
      case 'inProgress':
        return `${currentPlayer()?.name}'s turn`;
      case 'gameOver':
        return `Game is over! ${winner?.name} has won!`
      default:
        return 'Game in invalid state, oops!'
    }
  }

  const handleClearTurnPendingScore = (e: React.MouseEvent) => {
    if (gameStage === 'inProgress') {
      setTurn(prev => ({
        ...prev,
        pendingCategory: null,
        pendingScore: null
      }));
    }
  }

  return (
    <div className="app" onClick={handleClearTurnPendingScore}>
      <main className="game-mat">
        <div className="play-area">
          <h2>{gameMessage()}</h2>
          {gameStage === "enterNames" ? (
            <button
              onClick={handleStartGame}
              disabled={!ableToStartGame}
              className="start-game-button"
            >
              Start game
            </button>
          ) : (
            <DiceArea />
          )}
        </div>
        <Scoresheet />
      </main>
    </div>
  );
}
