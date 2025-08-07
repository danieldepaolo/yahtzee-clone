import { useAtom, useAtomValue } from "jotai";
import DiceArea from "./components/DiceArea";
import Scoresheet from "./components/Scoresheet";

import { gamePlayersAtom, gameStageAtom } from "./store/atoms";
import "./styles/app.scss";

export function App() {
  const [gameStage, setGameStage] = useAtom(gameStageAtom);
  const players = useAtomValue(gamePlayersAtom);

  const ableToStartGame = gameStage === "enterNames" && players.length > 0;

  const handleStartGame = () => {
    if (ableToStartGame) {
      setGameStage("inProgress");
    }
  };

  return (
    <div className="app">
      <main className="game-mat">
        <div className="play-area">
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
