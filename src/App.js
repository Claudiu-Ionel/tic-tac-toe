import './style/_main.scss';
import { useContext } from 'react'
import Game from './Components/Game.jsx'
import GameMenu from './Components/GameMenu/GameMenu';
import { AppContext } from './context/Context'
import react from 'react';
function App() {
  const {gameStart} = useContext(AppContext)
  return (
    <div className="App">

      <header className="App-header">
        {!gameStart && <GameMenu/>}
        {gameStart && <Game />}
        
      </header>
    </div>
  );
}

export default App;