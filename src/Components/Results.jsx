import React from 'react';
import { playerValue } from './Functions/PlayerValue';
import { useGlobalState } from '../App';

const Results = ({ title, score }) => {
  const globalState = useGlobalState();
  return (
    <div className="results">
      <h6>{`${title}`}</h6>
      <p>{score}</p>
    </div>
  );
};

export default Results;
