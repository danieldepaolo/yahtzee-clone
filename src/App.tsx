import DiceArea from './components/DiceArea';
import Scoresheet from './components/Scoresheet';

import './styles/app.scss';

export function App() {
  return (
    <div className="app">
      <h1>Yahtzee Clone</h1>
      <DiceArea />
      <Scoresheet />
    </div>
  );
}
