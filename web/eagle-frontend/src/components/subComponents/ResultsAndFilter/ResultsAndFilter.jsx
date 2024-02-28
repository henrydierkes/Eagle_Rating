import React, { useState } from 'react';
import ResultList from "../../ResultList/ResultList"
import Filter from "../../Filter/Filter";
import './ResultsAndFilter.css';

const ResultsAndFilter = ( {results} ) => {
  const [filteredResults, setFilteredResults] = useState(results);

  const handleFilterChange = (filters) => {
    console.log('Filters applied:', filters);
  };

  return (
    <div className="resultsandfilter">
      <ResultList results={filteredResults} />
      <div className="resultseparator"></div>
      <Filter onFilterChange={handleFilterChange} />
    </div>
  );
};

export default ResultsAndFilter;