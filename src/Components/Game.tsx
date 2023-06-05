import React, { useEffect } from 'react';
import Board from './Board';
import { useContext} from 'react';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
import { ReactComponent as Redo } from '../assets/Redo.svg';
import { AppContext } from '../context/Context';
import { initializeApp } from "firebase/app";
import { getDatabase, ref,  onValue } from "firebase/database";
import Modal from './Modal';
import Results from './Results';
import Logo from './Logo';



const Game = () => {
  const {
    player,
    modalMessage,
    setModalMessage,
    score,
    setGameState,
    vsPlayerMode
  } = useContext(AppContext);

  const firebaseConfig = {
    apiKey: "AIzaSyC1jIKmsCECrO-eThgDAj6DaR_pU4lO_LE",
    authDomain: "tic-tac-toe-server-c9104.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-server-c9104-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tic-tac-toe-server-c9104",
    storageBucket: "tic-tac-toe-server-c9104.appspot.com",
    messagingSenderId: "786914008830",
    appId: "1:786914008830:web:6228eedfa14451c5988faf",
    measurementId: "G-NYEHZEKQ1Q"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  
  // const dbRef = ref(database);
  // get(child(dbRef, `gameState`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     setGameState(snapshot.val())
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });


  

  useEffect(() => {
    if (vsPlayerMode) {
      console.log("database fetch");
        const gameStateRef = ref(database, 'gameRooms/testRoom/gameState');
        onValue(gameStateRef, (snapshot) => {
          const data = snapshot.val();
          setGameState(data)
      });
    }
  }, [])

  return (
    <>
      {modalMessage && <Modal message={modalMessage} />}
      <div className="top-section" style={{ marginBottom: '15px' }}>
        <Logo></Logo>
        <div className="current-player-view">
          {player && <Xshape style={{ width: "20%", height: 20, marginRight: 10, fill: '#A8BFC9' }} />}
          {!player && (
            <Oshape style={{ width: 20, height: 20, marginRight: 10, fill: '#A8BFC9' }} />
          )}
          {'turn'}
        </div>
        <button onClick={(e) => setModalMessage('restart')} className="reset-button">
          <Redo />
        </button>
      </div>
      <Board />
      <div className="game-results">
        <Results title="X" score={score.X} />
        <Results title="ties" score={score.ties} />
        <Results title="O" score={score.O} />
      </div>
    </>
  );
};

export default Game;
