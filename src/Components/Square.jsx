import React, { useState, useEffect, useContext } from 'react';
import { playerValue } from './Functions/PlayerValue';
import { AppContext } from '../context/Context';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';

const Square = ({ index }) => {
  
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
    winningSequence,
    cpuTurn
  } = useContext(AppContext);
  
  const [value, setValue] = useState(gameState[index]);


  useEffect(() => {
    if (resetBoard === true) {
      setValue(gameState[index]);
      setHover(false);
      setResetBoard(false);
    } else {
      return;
    }
  }, [resetBoard]);

  useEffect(() => {
    setValue(gameState[index])
  }, [gameState])
  

  // useEffect(() => {
  //   if (cpuTurn) {
  //     setHover(false)
  //   }
  //   else {
  //     setHover(true)
  //   }
  // }, [cpuTurn])
  function setBackgroundColor() {
    if (value === 'X') return '#31C3BD';
    return '#F2B137';
  }
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
    
    if (!cpuTurn) {
      setHover(false);
    setValue(playerValue(player));
    const newGameValues = Object.assign([...gameState], {
      [index]: playerValue(player),
    });
    setGameState(newGameValues);
    setPlayer(!player);
    }
    
  }
  return (
    <button
      onMouseEnter={(e) => value ? setHover(false) : setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      disabled={value || gameWon || gameDraw || cpuTurn}
      className={`board-square`}
      style={{
        backgroundColor: winningSequence.includes(index) ? setBackgroundColor() : '#1F3641',
      }}
      onClick={() => handleClick()}
    >
      {hover && !value ? hoverSVG() : false}
      {value === 'X' && (
        <Xshape
          style={{
            fill: winningSequence.includes(index) ? '#1F3641' : '#31C3BD',
            width: '50%',
            height: '50%',
          }}
        />
      )}

      {value === 'O' && (
        <Oshape
          style={{
            fill: winningSequence.includes(index) ? '#1F3641' : '#F2B137',
            width: '50%',
            height: '50%',
          }}
        />
      )}
    </button>
  );
};

export default Square;
