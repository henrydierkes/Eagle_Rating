import React from 'react';
import ResultList from "../../ResultList/ResultList"
import Filter from "../../Filter/Filter";
import './ResultsAndFilter.css';

const ResultsAndFilter = ( {results} ) => {
  return (
    <div className="resultsandfilter">
      <ResultList results={results}/>
      <div className="resultseparator"></div>
      <Filter />
    </div>
  );
};

export default ResultsAndFilter;