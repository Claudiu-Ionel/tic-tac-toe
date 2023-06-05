import React from 'react';

type resultsProps = {
  title: string;
  score: number;
}


const Results = ({ title, score }: resultsProps) => {
  return (
    <div className="results">
      <h6>{`${title}`}</h6>
      <p>{score}</p>
    </div>
  );
};

export default Results;
