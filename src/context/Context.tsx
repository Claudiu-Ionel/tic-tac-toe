import React from 'react'
import { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { playerValue } from '../Components/Functions/PlayerValue';



export const Xvalue = "X";
type ScoreProps = {
  X: number,
  ties: number,
  O: number
}

export interface GlobalContext {
  resetBoard: boolean;
  setResetBoard: React.Dispatch<React.SetStateAction<boolean>>;
  player: boolean;
  setPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: string[];
  setGameState: React.Dispatch<React.SetStateAction<string[]>>;
  gameWon: boolean;
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  gameDraw: boolean;
  setGameDraw: React.Dispatch<React.SetStateAction<boolean>>;
  modalMessage: "X" | "O" | "tie" | "restart" | '';
  setModalMessage: React.Dispatch<React.SetStateAction<"X" | "O" | "tie" | "restart" | ''>>;
  score: ScoreProps;
  setScore: React.Dispatch<React.SetStateAction<ScoreProps>>;
  resetGame: () => void;
  winningSequence: number[];
  setWinningSequence: React.Dispatch<React.SetStateAction<number[]>>;
  playerStart: string;
  setPlayerStart: React.Dispatch<React.SetStateAction<string>>;
  navigationState: "Menu" | "Game" | "Auth"  ;
  setNavigationState: React.Dispatch<React.SetStateAction<"Menu" | "Game" | "Auth" >>;
  CPU_choice: () => void;
  handleResultValidation: () => void;
  enableCpuMode: () => void;
  vsPlayerMode: boolean;
  setVsPlayerMode: React.Dispatch<React.SetStateAction<boolean>>;
  cpuMode:boolean;
  cpuTurn: boolean;
  setCpuTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

type ChildrenProps = {
  children?:  ReactNode
}

export const AppContext = createContext<GlobalContext>({
  resetBoard: false,
  setResetBoard: function (value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  player: false,
  setPlayer: function (value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  gameState: [],
  setGameState: function (value: React.SetStateAction<string[]>): void {
    throw new Error('Function not implemented.');
  },
  gameWon: false,
  setGameWon: function (value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  gameDraw: false,
  setGameDraw: function (value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  modalMessage: "",
  setModalMessage: function (value: React.SetStateAction<"X" | "O" | "tie" | "restart" | ''>): void {
    throw new Error('Function not implemented.');
  },
  score: {
    X: 0,
    ties: 0,
    O: 0
  },
  setScore: function (value: React.SetStateAction<ScoreProps>): void {
    throw new Error('Function not implemented.');
  },
  resetGame: function (): void {
    throw new Error('Function not implemented.');
  },
  winningSequence: [],
  setWinningSequence: function (value: React.SetStateAction<number[]>): void {
    throw new Error('Function not implemented.');
  },
  playerStart: '',
  setPlayerStart: function (value: React.SetStateAction<string>): void {
    throw new Error('Function not implemented.');
  },
  navigationState: "Menu",
  setNavigationState: function (value: React.SetStateAction<"Menu" | "Game" | "Auth">): void {
    throw new Error('Function not implemented.');
  },
  CPU_choice: function (): void {
    throw new Error('Function not implemented.');
  },
  handleResultValidation: function (): void {
    throw new Error('Function not implemented.');
  },
  enableCpuMode: function (): void {
    throw new Error('Function not implemented.');
  },
  vsPlayerMode: false,
  setVsPlayerMode: function (value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  cpuMode: false,
  cpuTurn: false,
  setCpuTurn: function (value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  }
});

export const AppContextProvider = ({children}: ChildrenProps) => {
  
  const [playerStart, setPlayerStart] = useState('X')
  const [navigationState, setNavigationState] = useState<"Menu" | "Game" | "Auth">("Menu")
  const [player, setPlayer] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);
  const [modalMessage, setModalMessage] = useState<GlobalContext["modalMessage"]>('');
  const [resetBoard, setResetBoard] = useState(false);
  const [gameState, setGameState] = useState<string[]>(['', '', '', '', '', '', '', '', '']);
  const [score, setScore] = useState<ScoreProps>({ X: 0, ties: 0, O: 0 });
  const [winningSequence, setWinningSequence] = useState<number[]>([]);
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
    setNavigationState("Game")
    setCpuMode(true)
    // setGameStart(true)
    if (playerStart === "O") {
      setCpuTurn(true)
    }
  }
  


  
  const CPU_choice = () => {
    
    setTimeout(() => {
    const computerSymbol = playerStart === "X" ? "O" : "X";
    
    const cpuChoice  = computerMove(gameState,  playerStart, computerSymbol);
    console.log(cpuChoice);
    if (cpuChoice !== null) {
      const newGameValues = Object.assign([...gameState], {
        [cpuChoice]: playerValue(player),
      });
    setGameState(newGameValues);
    setPlayer(!player)
    setCpuTurn(false)
    }
     
    }, 500)
        
    }
  
  
  const handleResultValidation = () => {
    console.log("resultValidation");
    // handle the click event
    let roundWon = false;
    let winValue = ""; 
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
        winValue = a;
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setGameWon(true);
      setModalMessage(`${winValue === 'O'? 'O' : 'X'}`);
      winValue === 'O' ? setScore((state) => ({
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
 
  
    useEffect(() => {
      if (didMountRef.current) {
        handleResultValidation()
      }
      didMountRef.current = true
      return () => {

      }
    }, [gameState])

    useEffect(() => {
      if (cpuTurn === true) {
        CPU_choice()
      }
    }, [cpuTurn])



  type minMaxProps = {
    board: String[],
    depth: number,
    isMaximizingPlayer: Boolean,
    playerSymbol: string,
    computerSymbol: string,
  }
  type evaluateProps = {
    board: String[],
    playerSymbol: string, 
    computerSymbol: string,
  }
  type computerMoveProps = {
    board: String[],
    playerSymbol: string, 
    computerSymbol: string,
  }

  function minimax(board: string[], depth: number, isMaximizingPlayer: boolean, playerSymbol: string, computerSymbol: string): number | null {
    const result = evaluate(board, playerSymbol, computerSymbol);
    if (result !== null || depth === 0) {
      return result;
    }
  
    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
  
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = computerSymbol;
          const score = minimax(board, depth - 1, false, playerSymbol, computerSymbol);
          board[i] = '';
          if (score !== null) {
            bestScore = Math.max(score, bestScore);
          }
        }
      }
  
      return bestScore;
    } else {
      let bestScore = Infinity;
  
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = playerSymbol;
          const score = minimax(board, depth - 1, true, playerSymbol, computerSymbol);
          board[i] = '';
          if (score !== null) {
            bestScore = Math.min(score, bestScore);
          }
        }
      }
  
      return bestScore;
    }
  }
  
  
  function evaluate(board: string[], playerSymbol: string, computerSymbol: string): number | null {
    const winningPositions: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
  
    for (const positions of winningPositions) {
      const [a, b, c] = positions;
      if (board[a] === playerSymbol && board[b] === playerSymbol && board[c] === playerSymbol) {
        return -10;
      } else if (board[a] === computerSymbol && board[b] === computerSymbol && board[c] === computerSymbol) {
        return 10;
      }
    }
  
    if (board.filter(value => value === '').length === 0) {
      return 0;
    }
  
    return null;
  }
  
  function computerMove(board: string[], playerSymbol: string, computerSymbol: string): number | null {
    let bestScore = -Infinity;
    let bestMove: number | null = null;
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = computerSymbol;
        const score = minimax(board, 5, false, playerSymbol, computerSymbol);
        board[i] = '';
  
        if (score !== null && score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  
    return bestMove;
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
        navigationState, 
        setNavigationState,
        CPU_choice,
        handleResultValidation,
        enableCpuMode,
        vsPlayerMode, 
        setVsPlayerMode,
        cpuMode,
        cpuTurn,
        setCpuTurn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
