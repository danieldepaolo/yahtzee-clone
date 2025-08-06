import { useAtom } from 'jotai';
import DiceArea from './components/DiceArea';
import Scoresheet from './components/Scoresheet';

import { gameStageAtom } from './store/atoms';
import './styles/app.scss';

export function App() {
  const [gameStage, setGameStage] = useAtom(gameStageAtom);

  return (
    <div className="app">
      <h1>Yahtzee Clone</h1>
      {gameStage === 'enterNames' ? (
        <button onClick={() => setGameStage('inProgress')}>Start game</button>
      ) : (
        <DiceArea />
      )}
      <Scoresheet />
    </div>
  );
}
