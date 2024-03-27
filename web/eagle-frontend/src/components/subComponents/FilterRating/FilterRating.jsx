import React, { useState, useEffect, useRef } from 'react';
import './FilterRating.css';

const FilterRating = () => {
    const [rangeValues, setRangeValues] = useState({
        overall: 4.6,
        size: 4.6,
        quiet: 3.9,
        clean: 3.0
    });

    const [subRatingsEnabled, setSubRatingsEnabled] = useState(true);
    const [individualToggles, setIndividualToggles] = useState({
        size: true,
        quiet: true,
        clean: true
    });

    // Refs for the sliders to calculate positions
    const sliderRefs = useRef({
        overall: null,
        size: null,
        quiet: null,
        clean: null
    });

    const handleMasterToggle = () => {
        const newEnabledState = !subRatingsEnabled;
        setSubRatingsEnabled(newEnabledState);
        setIndividualToggles({
            size: newEnabledState,
            quiet: newEnabledState,
            clean: newEnabledState
        });
    };

    const handleIndividualToggle = (name) => () => {
        setIndividualToggles(prevToggles => ({
            ...prevToggles,
            [name]: !prevToggles[name]
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRangeValues(prevValues => ({
            ...prevValues,
            [name]: parseFloat(value).toFixed(1)
        }));
    };

    useEffect(() => {
        // Adjust the position of value indicators upon initial render and when values change
        Object.keys(rangeValues).forEach(key => {
            const slider = sliderRefs.current[key];
            if (slider) {
                const valueIndicator = slider.nextSibling;
                const newValue = rangeValues[key];
                const max = slider.max;
                const min = slider.min;
                const percentage = ((newValue - min) / (max - min)) * 100;
                valueIndicator.style.left = `calc(${percentage}% + (${(20 - percentage * 0.4)}px))`; // Adjust based on slider thumb width
            }
        });
    }, [rangeValues]);

    return (
        <div className="filter-rating">
            <h2 className="filterhead">Filter by ratings</h2>
            {Object.entries(rangeValues).map(([key, value]) => (
                <div key={key}
                     className={`range-slider ${key !== 'overall' && (!subRatingsEnabled || !individualToggles[key]) ? 'disabled' : ''}`}>
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <span
                        className={`zero ${key !== 'overall' && (!subRatingsEnabled || !individualToggles[key]) ? 'disabled' : ''}`}>
                        0.0
                    </span>
                    <input
                        ref={el => sliderRefs.current[key] = el}
                        name={key}
                        type="range"
                        min="0"
                        max="5.0"
                        step="0.1"
                        value={value}
                        onChange={handleInputChange}
                        className="range-slider__range"
                        disabled={key !== 'overall' && (!subRatingsEnabled || !individualToggles[key])}
                    />
                    <span
                        className={`zero ${key !== 'overall' && (!subRatingsEnabled || !individualToggles[key]) ? 'disabled' : ''}`}>
                        5.0
                    </span>
                    <div
                        className={`range-slider__value ${key !== 'overall' && (!subRatingsEnabled || !individualToggles[key]) ? 'disabled' : ''}`}
                        style={key !== 'overall' && (!subRatingsEnabled || !individualToggles[key]) ? {opacity: 0.5} : {}}
                    >
                        {value}
                    </div>
                    {key !== 'overall' && (
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={individualToggles[key]}
                                onChange={handleIndividualToggle(key)}
                                disabled={!subRatingsEnabled}
                            />
                            <span className="slider round"></span>
                        </label>
                    )}
                </div>
            ))}
            <div className="master-toggle">
                <label>Enable Subratings</label>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={subRatingsEnabled}
                        onChange={handleMasterToggle}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
};

export default FilterRating;
