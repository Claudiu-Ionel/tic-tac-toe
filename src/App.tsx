import React from 'react'
import './style/_main.scss';
import  { useContext } from 'react'
import Game from './Components/Game'
import GameMenu from './Components/GameMenu/GameMenu';
import { AppContext } from './context/Context'
import Auth from './Components/AuthView/Auth';



const App: React.FC = () => {
  const {navigationState} = useContext(AppContext)
  return (
    <div className="App">

      <header className="App-header">
        {navigationState === "Menu" && <GameMenu/>}
        {navigationState === "Game" && <Game />}
        {navigationState === "Auth" && <Auth/>}
        
      </header>
    </div>
  );
}

export default App;

