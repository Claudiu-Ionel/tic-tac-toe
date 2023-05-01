import React from 'react';
import Board from './Board';
import { useContext, useEffect } from 'react';
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
    gameState,
    setGameWon,
    setGameDraw,
    modalMessage,
    setModalMessage,
    score,
    setScore,
    setWinningSequence,
  } = useContext(AppContext);

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
  useEffect(() => {
    const handleResultValidation = () => {
      // handle the click event
      let roundWon = false;

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
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        setGameWon(true);
        setModalMessage(`${player === true ? 'O' : 'X'}`);
        player
          ? setScore((state) => ({
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
    };
    handleResultValidation();
    return () => {};
  }, [gameState]);

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
