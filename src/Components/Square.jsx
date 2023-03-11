import React, { useState, useEffect } from 'react';
import { playerValue } from './Functions/PlayerValue';
import { useGlobalState } from '../App';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';
import styles from './Square.module.css';
const Square = ({ index }) => {
  const [value, setValue] = useState();
  const globalState = useGlobalState();
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
      setResetBoard(false);
    } else {
      return;
    }
  }, [resetBoard]);
  function handleClick() {
    setValue(playerValue(player));
    const myNewArray = Object.assign([...gameState], {
      [index]: playerValue(player),
    });
    setGameState(myNewArray);
    setPlayer(!player);
  }
  return (
    <button
      disabled={value || gameWon || gameDraw}
      // style={{ backgroundColor: value === 'X' ? 'blue' : value === 'O' ? 'red' : 'grey' }}
      className={`board-square ${styles.button}`}
      onClick={() => handleClick()}
    >
      {value === 'X' && <Xshape />}
      {value === 'O' && <Oshape />}
    </button>
  );
};

export default Square;
