import React from 'react';

const Results = ({ title, score }) => {
  return (
    <div className="results">
      <h6>{`${title}`}</h6>
      <p>{score}</p>
    </div>
  );
};

export default Results;
