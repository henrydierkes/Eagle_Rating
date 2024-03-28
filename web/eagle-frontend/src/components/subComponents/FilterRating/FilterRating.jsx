import React, { useState } from 'react';
import './FilterRating.css';

const FilterRating = () => {
    const [rangeValue, setRangeValue] = useState({
        overall: 4.6,
    });

    const getRatingColor = (averageRating) => {
        if (averageRating >= 4) {
            return 'rgba(0, 128, 255, 0.7)'; // Light blue gradient
        } else if (averageRating >= 2) {
            return 'rgba(255, 193, 7, 0.7)'; // Lighter amber
        } else {
            return '#F44336'; // Red
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRangeValue(prevValue => ({
            ...prevValue,
            [name]: parseFloat(value).toFixed(1)
        }));
    };

    return (
        <div className="filter-rating">
            <h2 className="filterhead">Filter by Overall Rating</h2>
            <div className="range-slider">
                {/* Positioned value box */}
                <div
                    className="range-slider__value"
                    style={{
                        backgroundColor: getRatingColor(rangeValue.overall),
                        // Additional styles for positioning above the slider
                        position: 'absolute',
                        left: '50%', // Center horizontally relative to the slider
                        bottom: '100%', // Position at the bottom of the slider, effectively placing it above due to container's position
                        transform: 'translate(-50%, -10px)', // Adjust vertically and horizontally to center and lift above the slider
                        zIndex: 2, // Ensure it's above the slider
                    }}
                >
                    {rangeValue.overall}
                </div>
                <span className="zero"></span>
                <input
                    name="overall"
                    type="range"
                    min="0"
                    max="5.0"
                    step="0.5"
                    value={rangeValue.overall}
                    onChange={handleInputChange}
                    className="range-slider__range"
                />
                <span className="zero"></span>
            </div>
        </div>
    );
};

export default FilterRating;
