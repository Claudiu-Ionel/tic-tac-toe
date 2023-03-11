import React, { useState } from 'react';
import Square from './Square';
import { useGlobalState } from '../App';
import '../style/_board.scss';
const Board = () => {
  const globalState = useGlobalState();
  const { gameState } = globalState;
  console.log(gameState);
  return (
    <section className="board">
      {gameState.map((item, index) => {
        return <Square key={index} index={index}></Square>;
      })}
    </section>
  );
};

export default Board;
