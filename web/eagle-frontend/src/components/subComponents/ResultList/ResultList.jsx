import React, { useState } from 'react';
import './ResultList.css';
import { useNavigate } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useAuth} from "../../../contexts/AuthContext.jsx";
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
    const [bookmarked, setBookmarked] = useState({});
    const [sortingMethod, setSortingMethod] = useState('highestRating');
    const { currentUser } = useAuth();
    const toggleBookmark = (index, e) => {
        e.stopPropagation(); // Prevent the click from reaching the result item
        setBookmarked(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const navigateToLocationDetail = (locationId) => {
        navigate(`/ratingpage/${locationId}`);
    };

    const handleSortingChange = (event) => {
        setSortingMethod(event.target.value);
    };

    const sortResults = (method) => {
        switch (method) {
            case 'highestRating':
                return [...results].sort((a, b) => b.averageRating?.overall - a.averageRating?.overall);
            case 'lowestRating':
                return [...results].sort((a, b) => a.averageRating?.overall - b.averageRating?.overall);
            case 'mostRatings':
                return [...results].sort((a, b) => b.ratingCount - a.ratingCount);
            default:
                return results;
        }
    };

    const sortedResults = sortResults(sortingMethod);

    return (
        <div className="result-list">
            <Select
                value={sortingMethod}
                onChange={handleSortingChange}
                variant="outlined"
                sx={{
                    width: '105.5%', // Scale to screen width
                    margin: '20px 10px 20px 0px', // Center horizontally and add margin on the bottom
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '5px',
                        backgroundColor: '#fff',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '10px',
                    },
                    '& .MuiInputLabel-outlined': {
                        color: '#555',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ccc',
                    },
                    '& .MuiSelect-iconOutlined': {
                        color: '#555',
                    },
                }}
            >
                <MenuItem value="highestRating">Sort by Highest Rating</MenuItem>
                <MenuItem value="lowestRating">Sort by Lowest Rating</MenuItem>
                <MenuItem value="mostRatings">Sort by Most Ratings</MenuItem>
            </Select>

            {sortedResults.map((result, index) => (
                <div key={result.locIdStr || index} className="result-item" onClick={() => navigateToLocationDetail(result.locIdStr)}>
                    <div className="rating-box" style={{ background: getRatingColor(result.averageRating?.overall) }}>
                        <span className="rating-number">{result.averageRating?.overall.toFixed(1)}</span>
                    </div>
                    {currentUser && (
                        <div className="highlight-tag" onClick={(e) => toggleBookmark(index, e)}>
                            {bookmarked[index] ? (
                                <img src={bookmarkHighlightIcon} alt="Bookmarked" />
                            ) : (
                                <img src={bookmarkIcon} alt="Bookmark" />
                            )}
                        </div>
                    )}
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
