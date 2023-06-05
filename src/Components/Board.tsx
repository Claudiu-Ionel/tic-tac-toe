import React, { useContext } from 'react';
import Square from './Square';
import { AppContext } from '../context/Context';

const Board = () => {
  const { gameState } = useContext(AppContext);
  return (
    <section className="board">
      {gameState.map((item, index) => {
        return <Square key={index} index={index}></Square>;
      })}
    </section>
  );
};

export default Board;
