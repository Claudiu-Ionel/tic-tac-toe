import React from 'react';

const Square = ({ onClick }) => {
  const style = {
    width: '33%',
    height: '33%',
  };
  return <button style={style} onClick={onClick}></button>;
};

export default Square;
