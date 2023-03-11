import React, { useState, useEffect, useRef } from 'react';
import { playerValue } from './Functions/PlayerValue';
import { useGlobalState } from '../App';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
import styles from './Square.module.css';
const Square = ({ index }) => {
  const [value, setValue] = useState('');
  const [hover, setHover] = useState(false);
  const globalState = useGlobalState();
  const squareRef = useRef(null);
  const {
    resetBoard,
    setResetBoard,
    player,
    setPlayer,
    gameState,
    setGameState,
    gameWon,
    gameDraw,
  } = globalState;

  useEffect(() => {
    if (resetBoard === true) {
      setValue('');
      setHover(false);
      setResetBoard(false);
    } else {
      return;
    }
  }, [resetBoard]);

  function hoverSVG() {
    if (player) return <Xshape style={{ fill: 'transparent', stroke: '#31C3BD' }} />;
    return <Oshape style={{ fill: 'transparent', stroke: '#F2B137' }} />;
    //#31C3BD
  }

  function handleClick() {
    setHover(false);
    setValue(playerValue(player));
    const myNewArray = Object.assign([...gameState], {
      [index]: playerValue(player),
    });
    setGameState(myNewArray);
    setPlayer(!player);
  }
  return (
    <button
      ref={squareRef}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      disabled={value || gameWon || gameDraw}
      // style={{ backgroundColor: value === 'X' ? 'blue' : value === 'O' ? 'red' : 'grey' }}
      className={`board-square ${styles.button}`}
      onClick={() => handleClick()}
    >
      {hover ? hoverSVG() : null}
      {value === 'X' && <Xshape style={{ fill: '#31C3BD' }} />}
      {value === 'O' && <Oshape style={{ fill: '#F2B137' }} />}
    </button>
  );
};

export default Square;
