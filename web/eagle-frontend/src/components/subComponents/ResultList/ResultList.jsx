import React, { useState } from 'react';
import './ResultList.css';
import { useNavigate } from "react-router-dom";

const getRatingColor = (averageRating) => {
    if (averageRating >= 4) {
        return 'rgba(0, 128, 255, 0.7)'; // Light blue
    } else if (averageRating >= 2) {
        return 'rgba(255, 193, 7, 0.7)'; // Lighter amber
    } else {
        return '#F44336'; // Red
    }
};

const ResultList = ({ results }) => {
    const navigate = useNavigate();
    const [highlights, setHighlights] = useState({});

    const handleAddLocationClick = () => {
        navigate('/addLocation');
    };

    const toggleHighlight = (index, event) => {
        event.stopPropagation(); // Prevent click from propagating to parent div
        setHighlights(prev => ({
            ...prev,
            [index]: !prev[index] // Toggle the highlight state for the index
        }));
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
                    {/* Toggle highlight and change bookmark color onClick */}
                    <div 
                        className={`highlight-tag ${highlights[index] ? 'bookmark-active' : ''}`} 
                        onClick={(e) => toggleHighlight(index, e)}
                    >
                        <i className="gg-bookmark"></i> {/* Bookmark icon */}
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
