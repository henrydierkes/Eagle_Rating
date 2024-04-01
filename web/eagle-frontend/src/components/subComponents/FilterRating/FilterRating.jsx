import React, { useState } from 'react';
import './FilterRating.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const FilterRating = ({ onRatingChange }) => {
    const [rangeValue, setRangeValue] = useState({
        overall: 2.5,
    });

    // Initial state for chips with unique names and outlined variants
    const initialChips = [
        { name: 'Water Fountain', variant: 'outlined' },
        { name: 'Charging Port', variant: 'outlined' },
        { name: 'Busy', variant: 'outlined' },
        { name: 'Quiet', variant: 'outlined' },
        { name: 'Parking Space', variant: 'outlined' },
    ];

    const [chips, setChips] = useState(initialChips);

    // Function to handle click on any chip
    const handleClick = (index) => {
        // Toggle variant of the clicked chip
        const newChips = chips.map((chip, i) => {
            if (i === index) {
                return {
                    ...chip,
                    variant: chip.variant === 'outlined' ? '' : 'outlined'
                };
            }
            return chip;
        });
        setChips(newChips);
    };

    const getRatingColor = (averageRating) => {
        if (averageRating >= 4) {
            return 'rgba(0, 128, 255, 0.7)';
        } else if (averageRating >= 2) {
            return 'rgba(255, 193, 7, 0.7)';
        } else {
            return '#F44336';
        }
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newRangeValue = parseFloat(value);
        setRangeValue(prevValue => ({
            ...prevValue,
            [name]: newRangeValue
        }));
        // 调用父组件传递过来的回调函数，将新的评分值传回父组件
        onRatingChange(newRangeValue);
    };



    return (
        <div className="filter-rating">
            <h2 className="filterhead">Filter by Overall Rating</h2>
            <div className="range-slider">
                <div
                    className="range-slider__value"
                    style={{
                        backgroundColor: getRatingColor(rangeValue.overall),
                        position: 'absolute',
                        left: '50%',
                        bottom: '100%',
                        transform: 'translate(-50%, -10px)',
                        zIndex: 2,
                    }}
                >
                    {rangeValue.overall}
                </div>
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
            </div>
            <Stack direction="row" spacing={1} style={{ marginTop: '10em' }}>
                {chips.map((chip, index) => (
                    <Chip
                        key={index}
                        label={chip.name}
                        variant={chip.variant}
                        color="primary"
                        onClick={() => handleClick(index)}
                        style={{ marginRight: '1.5em' }}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default FilterRating;
