import './style/_main.scss';
import Game from './Components/Game.jsx'
import GameMenu from './Components/GameMenu/GameMenu';
function App() {

  return (
    <div className="App">

      <header className="App-header">
        {/* <Game /> */}
        <GameMenu/>
      </header>
    </div>
  );
}

export default App;