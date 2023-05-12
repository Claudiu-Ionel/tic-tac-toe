import { createContext, useState, useEffect, useRef } from 'react';
import { playerValue } from '../Components/Functions/PlayerValue';
export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [playerStart, setPlayerStart] = useState('X')
  const [gameView, setGameView] = useState(false)
  const [player, setPlayer] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [resetBoard, setResetBoard] = useState(false);
  const [gameState, setGameState] = useState(['', '', '', '', '', '', '', '', '']);
  const [score, setScore] = useState({ X: 0, ties: 0, O: 0 });
  const [winningSequence, setWinningSequence] = useState([]);
  const [cpuMode, setCpuMode] = useState(false);
  const [cpuTurn, setCpuTurn] = useState(false);
  const [vsPlayerMode, setVsPlayerMode] = useState(false)
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





 
  // function CpuTurnFunc() {
  //   console.log("playerStart", playerStart);
  //   if (playerStart === "X") {
  //     setCpuTurn(false);
  //   }
  //   setCpuTurn(true)
  // }



  function minimax(board, depth, isMaximizingPlayer, playerSymbol, computerSymbol) {
    // base case: if the game is over or the maximum depth has been reached, evaluate the score
    const result = evaluate(board, playerSymbol, computerSymbol);
    if (result !== null || depth === 0) {
      return result;
    }
  
    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
  
      // loop through all possible moves and choose the one with the highest score
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = computerSymbol;
          const score = minimax(board, depth - 1, false, playerSymbol, computerSymbol);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
  
      return bestScore;
    } else {
      let bestScore = Infinity;
  
      // loop through all possible moves and choose the one with the lowest score
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = playerSymbol;
          const score = minimax(board, depth - 1, true, playerSymbol, computerSymbol);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
  
      return bestScore;
    }
  }
  
  function evaluate(board, playerSymbol, computerSymbol) {
    // check for win/lose/draw
    const winningPositions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
  
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (board[a] === playerSymbol && board[b] === playerSymbol && board[c] === playerSymbol) {
        return -10;
      } else if (board[a] === computerSymbol && board[b] === computerSymbol && board[c] === computerSymbol) {
        return 10;
      }
    }
  
    if (board.filter(value => value === '').length === 0) {
      return 0;
    }
  
    // return null if the game is not over
    return null;
  }
  
  function computerMove(board, playerSymbol, computerSymbol) {
    let bestScore = -Infinity;
    let bestMove = null;
  
    // loop through all possible moves and choose the one with the highest score
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = computerSymbol;
        const score = minimax(board, 5, false, playerSymbol, computerSymbol); // set maximum depth to 5
        board[i] = '';
  
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  
    return bestMove;
  }


  const CPU_choice = () => {

    setTimeout(() => {
    const computerSymbol = playerStart === "X" ? "O" : "X";
    const cpuChoice = computerMove(gameState, playerStart, computerSymbol)
      // const freeSpots = [];
      // for (let i = 0; i < gameState.length; i++) {
      //   if (gameState[i].length === 0) {
      //     freeSpots.push(i);
      //   }
      // }
      // const randomIndex = Math.floor(Math.random() * freeSpots.length);
  
      // const newGameValues = Object.assign([...gameState], {
      //     [freeSpots[randomIndex]]: playerValue(player),
      //   });
      const newGameValues = Object.assign([...gameState], {
          [cpuChoice]: playerValue(player),
        });
      setGameState(newGameValues);
      setPlayer(!player)
      setCpuTurn(false)
    }, 500)
        
    }




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
        vsPlayerMode, setVsPlayerMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
