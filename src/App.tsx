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
      <h1>Yahtzee Clone</h1>
      <main className="main-play-area">
        <div className="dice-mat">
          {gameStage === "enterNames" ? (
            <button onClick={handleStartGame} disabled={!ableToStartGame}>
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
