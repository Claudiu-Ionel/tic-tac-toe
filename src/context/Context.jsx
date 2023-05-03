import { createContext, useState } from 'react';
import { playerValue } from '../Components/Functions/PlayerValue';
export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [playerStart, setPlayerStart] = useState('X')
  const [gameStart, setGameStart] = useState(false)
  const [player, setPlayer] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [resetBoard, setResetBoard] = useState(false);
  const [gameState, setGameState] = useState(['', '', 'X', '', '', '', '', '', '']);
  const [score, setScore] = useState({ X: 0, ties: 0, O: 0 });
  const [winningSequence, setWinningSequence] = useState([]);

  function CPU_choice() {

    console.log("before:", gameState);
  
    const freeSpots = [];
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i].length === 0) {
        freeSpots.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * freeSpots.length);
    console.log(freeSpots);
    console.log(randomIndex);

    const newGameValues = Object.assign([...gameState], {
        [freeSpots[randomIndex]]: playerValue(player),
      });
      setGameState(newGameValues);
  
    console.log("after:", gameState);
  }

  const resetGame = () => {
    setGameState(['', '', '', '', '', '', '', '', '']);
    setResetBoard(true);
    setPlayer(true);
    setGameDraw(false);
    setGameWon(false);
    setModalMessage('');
    setWinningSequence([]);
  };
  return (
    <AppContext.Provider
      value={{
        resetBoard,
        setResetBoard,
        player,
        setPlayer,
        gameState,
        setGameState,
        gameWon,
        setGameWon,
        gameDraw,
        setGameDraw,
        modalMessage,
        setModalMessage,
        score,
        setScore,
        resetGame,
        winningSequence,
        setWinningSequence,
        playerStart, 
        setPlayerStart,
        gameStart, 
        setGameStart,
        CPU_choice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
