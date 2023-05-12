import React, { useEffect } from 'react';
import Board from './Board';
import { useContext} from 'react';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
import { ReactComponent as Redo } from '../assets/Redo.svg';
import { AppContext } from '../context/Context';
import Modal from './Modal';
import Results from './Results';
import Logo from './Logo';



const Game = () => {
  const {
    player,
    modalMessage,
    setModalMessage,
    score,
    vsPlayerMode,
  } = useContext(AppContext);


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
