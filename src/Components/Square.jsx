import React, { useState, useEffect } from 'react';
import { playerValue } from './Functions/PlayerValue';
import { useGlobalState } from '../App';
import styles from './Square.module.css';
const Square = ({ index }) => {
  const [value, setValue] = useState();
  const globalState = useGlobalState();
  const { resetBoard, setResetBoard, player, setPlayer, gameState, setGameState } = globalState;
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
  }
  return (
    <button disabled={value} className={styles.button} onClick={() => handleClick()}>
      {value}
    </button>
  );
};

export default Square;
