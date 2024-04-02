import React, { useState, useEffect } from 'react';
import ResultList from "../subComponents/ResultList/ResultList";
import './ResultsAndFilter.css';
import FilterRating from "../subComponents/FilterRating/FilterRating.jsx";

const ResultsAndFilter = ({ results, tagsParam, onPlaceClick }) => {
    const [filteredResults, setFilteredResults] = useState(results);
    const [selectedTags, setSelectedTags] = useState({});

    useEffect(() => {
        console.log('New results received:', results);
        setFilteredResults(results);
    }, [results]);

    const handleRatingChange = (newRating) => {
        const updatedFilteredResults = results.filter(result => result.averageRating.overall >= newRating);
        setFilteredResults(updatedFilteredResults);
    };

    // Function to filter results by selected tags
    const handleTagSelect = (tags) => {
        setSelectedTags(tags);

        // Filter the results by the selected tags
        const updatedFilteredResults = results.filter(result => {
            // Check if each of the selected tags is represented in the result's tags
            return Object.keys(tags).every(tagName => {
                // If the tag is selected, check if its value is greater than 0, otherwise return true
                return !tags[tagName] || (result.tags[tagName] > 0);
            });
        });

        setFilteredResults(updatedFilteredResults);
    };

    return (
        <div className="resultsandfilter">
            <ResultList results={filteredResults} tagsParam={tagsParam} onPlaceClick={onPlaceClick} />
            <div className="resultseparator"></div>
            <FilterRating onRatingChange={handleRatingChange} onTagSelect={handleTagSelect} />
        </div>
    );
};

export default ResultsAndFilter;
