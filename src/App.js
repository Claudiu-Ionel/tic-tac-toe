
import './App.css';
import Board from './Components/Board';
import { useState, useContext, createContext, useEffect, useCallback } from 'react'


function App() {
  const [player, setPlayer] = useState(true)
  const [resetBoard, setResetBoard] = useState(false)
  const [gameState, setGameState] = useState(["", "", "", "", "", "", "", "", ""])
  const globalState = {
    resetBoard,
    setResetBoard,
    player,
    setPlayer,
    gameState,
    setGameState
  };
  function changePlayer() {
    setPlayer((prev) => !prev)
  }
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const handleResultValidation = () => {
    // handle the click event
    let roundWon = false
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break
      }
    }

    if (roundWon) {
      console.log(`${player ? "Player 2" : "Player 1"} has won the game`)
      return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      console.log(`It's a draw!`)
      return;
    }

    return changePlayer()


  };
  useEffect(() => {

    handleResultValidation()
  }, [gameState])

  return (
    <div className="App">
      <AppContext.Provider value={globalState}>
        <header className="App-header">
          <div style={{ marginBottom: "15px" }}>{`It is ${player ? "Player 2" : "Player 1"}'s turn!`}</div>
          <Board />
          <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", justifyContent: "center", width: "15%" }}>
            <button onClick={(e) => {
              setGameState(["", "", "", "", "", "", "", "", ""])
              setResetBoard(true)
              setPlayer(true)
            }}>Reset</button>

          </div>
        </header>
      </AppContext.Provider>
    </div>
  );
}

export default App;
export const AppContext = createContext();
export function useGlobalState() {
  const globalState = useContext(AppContext);

  return globalState;
}