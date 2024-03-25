import React, { useState } from 'react';
import './ResultList.css';
import {useNavigate} from "react-router-dom";

const getRatingColor = (averageRating) => {
    if (averageRating >= 4) {
        return '#4CAF50'; // green
    } else if (averageRating >= 3) {
        return '#CDDC39'; // lime
    } else if (averageRating >= 2) {
        return '#FFC107'; // amber
    } else {
        return '#F44336'; // red
    }
};



const ResultList = ({ results, tagsParam }) => {
    const [highlights, setHighlights] = useState({});
    const navigate = useNavigate();

    const handleAddLocationClick = () => {
        navigate('/addLocation'); // Navigate to comment page
    };

    const toggleHighlight = (index) => {
        setHighlights(prevHighlights => ({
            ...prevHighlights,
            [index]: !prevHighlights[index]
        }));
    };

    const filteredResults = results.filter(result => result.locName === tagsParam);

    return (
        <div className="result-list">
            {filteredResults.map((result, index) => (
                <div key={result.locId || index} className="result-item">  {/* Use result.locId as key if available */}
                    <div
                        className="rating-box"
                        style={{backgroundColor: getRatingColor(result.averageRating?.overall)}}
                    >
                        {/* Ensure you use the ?. operator to safely access nested properties */}
                        <span className="rating-number">{result.averageRating?.overall.toFixed(1)}</span>
                    </div>
                    <div
                        className="highlight-tag"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: highlights[index] ? '#FFEB3B' : 'transparent',
                            cursor: 'pointer',
                            padding: '5px'
                        }}
                        onClick={() => toggleHighlight(index)}
                    >
                        {'☆'}
                    </div>
                    <div>
                        <h3>{result.locName}</h3>
                        {/* Use the appropriate fields from your Place entity */}
                        <p className="description">{result.ratingCount + " ratings"}</p>
                    </div>
                </div>
            ))}
            <button className="rating-button" onClick={handleAddLocationClick}>Add Location</button>
        </div>
    );
};

export default ResultList;
