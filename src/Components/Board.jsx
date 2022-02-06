import React from 'react';
import Square from './Square';
import { useEffect, useState } from 'react';
import { playerValue } from './Functions/PlayerValue';
const Board = ({ currentPlayer, reset }) => {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    height: '50%',
  };
  const [resetValue, setResetValue] = useState();
  useEffect(() => {
    if (reset === true) {
      setResetValue('');
    } else {
      return;
    }
  }, [reset]);

  return (
    <section style={style}>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
      <Square onClick={(e) => (e.target.innerHTML = playerValue(currentPlayer))}>
        {resetValue}
      </Square>
    </section>
  );
};

export default Board;
