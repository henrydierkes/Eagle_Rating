import React, { useState } from 'react';
import './ResultList.css';
import { useNavigate } from "react-router-dom";

const ResultList = ({ results }) => {
    // console.log(results)
    const [highlights, setHighlights] = useState({});
    const navigate = useNavigate();

    const handleAddLocationClick = () => {
        navigate('/addLocation');
    };

    const getRatingColor = (averageRating) => {
        if (averageRating >= 4) {
            // Gradient for high ratings
            return 'linear-gradient(to right, #5ea5fc80, #6379fe80)';
        } else if (averageRating >= 2) {
            // Amber for medium ratings
            return 'rgba(255, 193, 7, 0.7)';
        } else {
            // Different color for low ratings, assuming red was intended
            return '#F44336';
        }
    };

    return (
        <div className="result-list">
            {results.map((result, index) => (
                <div key={result.locId || index} className="result-item">
                    <div
                        className="rating-box"
                        style={{ background: getRatingColor(result.averageRating?.overall) }}
                    >
                        <span className="rating-number">{result.averageRating?.overall.toFixed(1)}</span>
                    </div>
                    <div>
                        <h3>{result.locName}</h3>
                        <p className="description">{result.ratingCount + " ratings"}</p>
                    </div>
                </div>
            ))}
            <button className="rating-button" onClick={handleAddLocationClick}>Add Location</button>
        </div>
    );
};

export default ResultList;
