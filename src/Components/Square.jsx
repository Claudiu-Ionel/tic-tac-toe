import React, { useState, useEffect, useContext } from 'react';
import { playerValue } from './Functions/PlayerValue';
import { AppContext } from '../context/Context';
import { ReactComponent as Xshape } from '../assets/X-shape.svg';
import { ReactComponent as Oshape } from '../assets/Oval-shape.svg';

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
    winningSequence,
  } = useContext(AppContext);
  
  useEffect(() => {
    if (resetBoard === true) {
      setValue('');
      setHover(false);
      setResetBoard(false);
    } else {
      return;
    }
  }, [resetBoard]);
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
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      disabled={value || gameWon || gameDraw}
      className={`board-square`}
      style={{
        backgroundColor: winningSequence.includes(index) ? setBackgroundColor() : '#1F3641',
      }}
      onClick={() => handleClick()}
    >
      {hover ? hoverSVG() : null}
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
