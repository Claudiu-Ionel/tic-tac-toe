import { createContext, useState, useEffect, useRef } from 'react';
import { playerValue } from '../Components/Functions/PlayerValue';
export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [playerStart, setPlayerStart] = useState('X')
  const [gameView, setGameView] = useState(false)
  const [player, setPlayer] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [resetBoard, setResetBoard] = useState(false);
  const [gameState, setGameState] = useState(['', '', '', '', '', '', '', '', '']);
  const [score, setScore] = useState({ X: 0, ties: 0, O: 0 });
  const [winningSequence, setWinningSequence] = useState([]);
  const [cpuMode, setCpuMode] = useState(false);
  const [cpuTurn, setCpuTurn] = useState(false);
  const [calculations, setCalculations] = useState(false)
  const didMountRef = useRef(false);
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  function enableCpuMode () {
    setGameView(true)
    setCpuMode(true)
    // setGameStart(true)
    if (playerStart === "O") {
      setCpuTurn(true)
    }
  }
  
  
  
  const handleResultValidation = () => {
    console.log("ran on first render");
    // handle the click event
    let roundWon = false;
    let winningValue = ""; 
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        setWinningSequence(winningConditions[i]);
        winningValue = a;
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setGameWon(true);
      setModalMessage(`${winningValue === 'O'? 'O' : 'X'}`);
      winningValue === 'O' ? setScore((state) => ({
            ...state,
            O: state.O + 1,
          }))
        : setScore((state) => ({
            ...state,
            X: state.X + 1,
          }));
      return;
    }
    let roundDraw = !gameState.includes('');
    if (roundDraw) {
      setGameDraw(true);
      setModalMessage(`tie`);
      setScore((state) => ({
        ...state,
        ties: state.ties + 1,
      }));
      return;
    }
     if (cpuMode) {
        setCpuTurn(true)
     }
  };
 
  // function useDidUpdateEffect(fn, inputs) {
  //   const didMountRef = useRef(false);
  
  //   useEffect(() => {
  //     if (didMountRef.current) { 
  //       return fn();
  //     }
  //     didMountRef.current = true;
  //   }, inputs);
  // }
  
    useEffect(() => {
      if (didMountRef.current) {
        handleResultValidation()
      }
      didMountRef.current = true
    }, gameState)

    useEffect(() => {
      if (cpuTurn === true) {
        CPU_choice()
      }
    }, [cpuTurn])





 const CPU_choice = () => {

  setTimeout(() => {
  
    const freeSpots = [];
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i].length === 0) {
        freeSpots.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * freeSpots.length);

    const newGameValues = Object.assign([...gameState], {
        [freeSpots[randomIndex]]: playerValue(player),
      });
    setGameState(newGameValues);
    setPlayer(!player)
    setCpuTurn(false)
  }, 500)
      
  }
  // function CpuTurnFunc() {
  //   console.log("playerStart", playerStart);
  //   if (playerStart === "X") {
  //     setCpuTurn(false);
  //   }
  //   setCpuTurn(true)
  // }
  const resetGame = () => {
    setGameState(['', '', '', '', '', '', '', '', '']);
    setResetBoard(true);
    setPlayer(true);
    setGameDraw(false);
    setGameWon(false);
    setModalMessage('');
    setWinningSequence([]);
    if (cpuMode && playerStart === "X") {
      didMountRef.current = false
      return setCpuTurn(false)
    } 
    if (cpuMode && playerStart === "O"){
      return setCpuTurn(true)
    }
    // if (cpuMode) return CpuTurnFunc()
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
        gameView, 
        setGameView,
        CPU_choice,
        handleResultValidation,
        enableCpuMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
