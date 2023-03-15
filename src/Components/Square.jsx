import React, { useState, useEffect, useRef, useContext } from 'react';
import { playerValue } from './Functions/PlayerValue';
import { AppContext } from '../context/Context';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
import styles from './Square.module.css';
const Square = ({ index }) => {
  const [value, setValue] = useState('');
  const [hover, setHover] = useState(false);
  const {
    resetBoard,
    setResetBoard,
    player,
    setPlayer,
    gameState,
    setGameState,
    gameWon,
    gameDraw,
  } = useContext(AppContext);
  const squareRef = useRef(null);

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
    if (player)
      return (
        <Xshape
          style={{
            fill: 'transparent',
            stroke: '#31C3BD',
            width: '50%',
            height: '50%',
          }}
        />
      );
    return (
      <Oshape
        style={{
          fill: 'transparent',
          stroke: '#F2B137',
          width: '50%',
          height: '50%',
        }}
      />
    );
    //#31C3BD
  }

  function handleClick() {
    setHover(false);
    setValue(playerValue(player));
    const newGameValues = Object.assign([...gameState], {
      [index]: playerValue(player),
    });
    setGameState(newGameValues);
    setPlayer(!player);
  }
  return (
    <button
      ref={squareRef}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      disabled={value || gameWon || gameDraw}
      className={`board-square ${styles.button}`}
      onClick={() => handleClick()}
    >
      {hover ? hoverSVG() : null}
      {value === 'X' && <Xshape style={{ fill: '#31C3BD', width: '50%', height: '50%' }} />}
      {value === 'O' && <Oshape style={{ fill: '#F2B137', width: '50%', height: '50%' }} />}
    </button>
  );
};

export default Square;
