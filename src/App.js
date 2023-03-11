import './style/_main.scss';
import Board from './Components/Board';
import { useState, useContext, createContext, useEffect } from 'react';
import { ReactComponent as Xshape } from './assets/X-shape.svg';
import { ReactComponent as Oshape } from './assets/Oval-shape.svg';
import { ReactComponent as Redo } from './assets/Redo.svg';
import Modal from "./Components/Modal";
function App() {
  const [player, setPlayer] = useState(true)
  const [gameWon, setGameWon] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);
  const [modalMessage, setModalMessage] = useState("")
  const [resetBoard, setResetBoard] = useState(false)
  const [gameState, setGameState] = useState(["", "", "", "", "", "", "", "", ""])
  function resetGame() {
    setGameState(["", "", "", "", "", "", "", "", ""])
    setResetBoard(true)
    setPlayer(true)
    setGameDraw(false);
    setGameWon(false);
    setModalMessage("");
  }
  const globalState = {
    resetBoard,
    setResetBoard,
    player,
    setPlayer,
    gameState,
    setGameState,
    gameWon,
    gameDraw
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
  useEffect(() => {

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
        setGameWon(true)
        setModalMessage(`${player ? "Player 2" : "Player 1"} has won the game`)
        return;
      }
      let roundDraw = !gameState.includes("");
      if (roundDraw) {
        setGameDraw(true)
        setModalMessage(`It's a draw!`)
        return;
      }



    };
    handleResultValidation()
  }, [gameState])

  return (
    <div className="App">
      <AppContext.Provider value={globalState}>
        <header className="App-header">
          {modalMessage && (<Modal message={modalMessage} />)}
          <div className='top-section' style={{ marginBottom: "15px" }}>
            <div className='logo'>
              <Xshape style={{ marginRight: 10, fill: '#31C3BD' }} /><Oshape style={{ fill: '#F2B137' }} />

            </div>
            <div className='current-player-view'>
              {player && <Xshape style={{ width: 15, height: 15, marginRight: 10, fill: '#31C3BD' }} />}
              {!player && <Oshape style={{ width: 15, height: 15, marginRight: 10, fill: '#F2B137' }} />}
              {"turn"}
            </div>
            <button onClick={(e) => resetGame()} className="reset-button">
              <Redo />
            </button>
          </div>
          <Board />
          <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", justifyContent: "center", width: "15%" }}>


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