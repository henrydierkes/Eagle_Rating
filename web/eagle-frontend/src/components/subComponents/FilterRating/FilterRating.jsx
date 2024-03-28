import React, { useState, useEffect, useRef } from 'react';
import './FilterRating.css';

const FilterRating = () => {
    const [rangeValue, setRangeValue] = useState({
        overall: 4.6,
    });

    const sliderRef = useRef({
        overall: null,
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

    useEffect(() => {
        // Adjust the position of value indicator upon initial render and when value changes
        const key = 'overall';
        const slider = sliderRef.current[key];
        if (slider) {
            const valueIndicator = slider.nextSibling.nextSibling; // Adjusted to skip over the min label span
            const newValue = rangeValue[key];
            const max = slider.max;
            const min = slider.min;
            const percentage = ((newValue - min) / (max - min)) * 100;
            valueIndicator.style.left = `calc(${percentage}% + (${(20 - percentage * 0.4)}px))`; // Adjust based on slider thumb width
        }
    }, [rangeValue]);

    return (
        <div className="filter-rating">
            <h2 className="filterhead">Filter by Overall Rating</h2>
            <div className="range-slider">
                <span className="zero">0.0</span>
                <input
                    ref={el => sliderRef.current['overall'] = el}
                    name="overall"
                    type="range"
                    min="0"
                    max="5.0"
                    step="0.1"
                    value={rangeValue.overall}
                    onChange={handleInputChange}
                    className="range-slider__range"
                />
                <span className="zero">5.0</span>
                <div
                    className="range-slider__value"
                    style={{ backgroundColor: getRatingColor(rangeValue.overall) }}
                >
                    {rangeValue.overall}
                </div>
            </div>
        </div>
    );
};

export default FilterRating;
