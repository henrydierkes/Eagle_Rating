import React from 'react';
import './ResultList.css';

const ResultList = ({ results }) => {
  return (
    <div className="result-list">
      <div className="results-container">
      {results.map((result, index) => ( /* takes informaiton from results array and displays it as a list */
          <div key={index} className="result-item">
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ResultList;
