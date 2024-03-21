import React, { useState, useEffect, useRef } from 'react';
import './FilterRating.css';

const FilterRating = () => {
    const [rating, setRating] = useState('');

    useEffect(() => {
        // You might want to fetch the ratings or perform some actions here
    }, []);

    // Function to render stars
    const renderStars = (num) => {
        return [...Array(num)].map((e, i) => (
            <span key={i} className="star">&#9733;</span> // This is the Unicode for a star
        ));
    };

    return (
        <div id="filterRatingContainer" className="filter-rating-container">
            <div className="yotpo-reviews-main-widget">
                <div className="yotpo-main-widget-layout">
                    <div className="yotpo-filters-container">
                        <div className="yotpo-filters-container-inner">
                            <div className="yotpo-filters-top-panel">
                                <span>Filter by rating</span>
                                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value="">All Ratings</option>
                                    <option value="5">{renderStars(5)}</option>
                                    <option value="4">{renderStars(4)}</option>
                                    <option value="3">{renderStars(3)}</option>
                                    <option value="2">{renderStars(2)}</option>
                                    <option value="1">{renderStars(1)}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterRating;
