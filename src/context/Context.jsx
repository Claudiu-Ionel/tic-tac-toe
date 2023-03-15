import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [player, setPlayer] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [resetBoard, setResetBoard] = useState(false);
  const [gameState, setGameState] = useState(['', '', '', '', '', '', '', '', '']);
  const [score, setScore] = useState({ X: 0, ties: 0, O: 0 });
  const resetGame = () => {
    setGameState(['', '', '', '', '', '', '', '', '']);
    setResetBoard(true);
    setPlayer(true);
    setGameDraw(false);
    setGameWon(false);
    setModalMessage('');
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
