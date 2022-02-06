import logo from './logo.svg';
import './App.css';
import Board from './Components/Board';
import { useState, useEffect } from 'react'

function App() {
  const [player, setPlayer] = useState("Player 1")
  const [reset, setReset] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginBottom: "15px" }}>{`It is ${player}'s turn!`}</div>
        <Board currentPlayer={player} reset={reset} />
        <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", justifyContent: "space-between", width: "15%" }}>
          <button onClick={(e) => setPlayer(e.target.innerHTML)}>Player 1</button>
          <button onClick={(e) => setPlayer(e.target.innerHTML)}>Player 2</button>
          <button onClick={(e) => setReset(true)}>Reset</button>

        </div>
      </header>
    </div>
  );
}

export default App;
