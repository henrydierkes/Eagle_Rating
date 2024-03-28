import React, { useState } from 'react';
import './ResultList.css';
import { useNavigate } from "react-router-dom";

const getRatingColor = (averageRating) => {
    if (averageRating >= 4) {
        return 'rgba(0, 128, 255, 0.7)';
    } else if (averageRating >= 2) {
        return 'rgba(255, 193, 7, 0.7)';
    } else {
        return '#F44336';
    }
};

const ResultList = ({ results }) => {
    const navigate = useNavigate();
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    const handleAddLocationClick = () => {
        navigate('/addLocation');
    };

    const toggleHighlight = (index) => {
        setHighlightedIndex(index === highlightedIndex ? null : index);
    };

    const navigateToLocationDetail = (locationId) => {
        navigate(`/ratingpage/${locationId}`);
    };

    return (
        <div className="result-list">
            {results.map((result, index) => (
                <div key={result.locationId || index} className="result-item" onClick={() => navigateToLocationDetail(result.locationId)}>
                    <div className="rating-box" style={{ background: getRatingColor(result.averageRating?.overall) }}>
                        <span className="rating-number">{result.averageRating?.overall.toFixed(1)}</span>
                    </div>
                    <div className="highlight-tag" onClick={() => toggleHighlight(index)}>
                        {highlightedIndex === index ? (
                            <span className="star" style={{ background: 'linear-gradient(to right, #5ea5fc, #6379fe)' }}>&#9733;</span>
                        ) : (
                            <i className="gg-bookmark"></i>
                        )}
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
