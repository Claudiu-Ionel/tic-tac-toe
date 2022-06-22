import React, { useState } from 'react';
import Square from './Square';
import { useGlobalState } from '../App';
const Board = () => {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    height: '50%',
  };
  const globalState = useGlobalState();
  const { gameState } = globalState;
  console.log(gameState);
  return (
    <section style={style}>
      {gameState.map((item, index) => {
        return <Square key={index} index={index}></Square>;
      })}
    </section>
  );
};

export default Board;
