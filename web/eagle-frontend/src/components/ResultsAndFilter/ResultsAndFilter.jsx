import React, { useState, useEffect } from 'react';
import ResultList from "../subComponents/ResultList/ResultList"
import Filter from "../subComponents/Filter/Filter";
import './ResultsAndFilter.css';
import FilterRating from "../subComponents/FilterRating/FilterRating.jsx";

// Accept onPlaceClick as a prop
const ResultsAndFilter = ({ results, tagsParam, onPlaceClick }) => {
  const [filteredResults, setFilteredResults] = useState(results);

  useEffect(() => {
    console.log('New results received:', results);
    setFilteredResults(results);
  }, [results]);

    const handleRatingChange = (newRating) => {
        const updatedFilteredResults = results.filter(result => result.averageRating.overall >= newRating);
        setFilteredResults(updatedFilteredResults);
        console.log(filteredResults)
    };


  return (
    <div className="resultsandfilter">
        {/* Pass onPlaceClick to ResultList */}
        <ResultList results={filteredResults} tagsParam={tagsParam} onPlaceClick={onPlaceClick} />
        <div className="resultseparator"></div>
        {/*<Filter onFilterChange={handleFilterChange} />*/}
        <FilterRating onRatingChange={handleRatingChange} />
    </div>
  );
};

export default ResultsAndFilter;
