import React, { useState, useEffect } from 'react';
import './ResultList.css';
import { useNavigate } from "react-router-dom";

// Assuming these imports are correct based on your project structure
import bookmarkIcon from '../Misc/bookmark.png';
import bookmarkHighlightIcon from '../Misc/bookmark highlight.png';

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
    const [bookmarked, setBookmarked] = useState({}); // State to track bookmarked items

    useEffect(() => {
        // Your existing useEffect logic...
    }, [results]);

    const toggleBookmark = (index, e) => {
        e.stopPropagation(); // Prevent the click from reaching the result item
        setBookmarked(prev => ({ ...prev, [index]: !prev[index] }));
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
                    <div className="highlight-tag" onClick={(e) => toggleBookmark(index, e)}>
                        {bookmarked[index] ? (
                            <img src={bookmarkHighlightIcon} alt="Bookmarked" />
                        ) : (
                            <img src={bookmarkIcon} alt="Bookmark" />
                        )}
                    </div>
                    <div>
                        <h3>{result.locName}</h3>
                        <p className="description">{result.ratingCount + " ratings"}</p>
                    </div>
                </div>
            ))}
            <button className="rating-button" onClick={() => navigate('/addLocation')}>Add Location</button>
        </div>
    );
};

export default ResultList;
