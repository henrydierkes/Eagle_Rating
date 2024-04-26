import React, { useState } from 'react';
import './FilterRating.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const FilterRating = ({ onRatingChange, onTagSelect }) => {
    const [rangeValue, setRangeValue] = useState({
        overall: 0.0,
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
    const [selectedTags, setSelectedTags] = useState({});

    // Function to handle click on a rating chip
    const handleTagClick = (index) => {
        const chipName = chips[index].name;

        // Determine the new selection state for this tag
        const isSelected = !selectedTags[chipName];

        // Update the selectedTags state
        setSelectedTags(prevSelectedTags => ({
            ...prevSelectedTags,
            [chipName]: isSelected
        }));

        // Now we call onTagSelect with all selected tags
        onTagSelect({ ...selectedTags, [chipName]: isSelected });

        // Update the chips to reflect the new state
        const newChips = chips.map((chip, i) => {
            if (i === index) {
                return { ...chip, variant: isSelected ? 'filled' : 'outlined' };
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
                        left: '45%',
                        bottom: '100%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                    }}
                >
                    {/* Format the range value to always have two decimal places */}
                    {Number(rangeValue.overall).toFixed(1)}
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
            <div className="space"></div>
            <Stack
                direction="row"
                spacing={1}
                style={{
                    marginTop: '2em', // Reduced margin for consistency
                    maxWidth: '80%', // Set maximum width of the Stack container
                    flexWrap: 'wrap', // Allow chips to wrap to new lines
                    justifyContent: 'center' // Center the chips in the Stack
                }}
            >
                {chips.map((chip, index) => (
                    <Chip
                        key={index}
                        label={chip.name}
                        variant={chip.variant}
                        color="primary"
                        onClick={() => handleTagClick(index)} // Handle chip clicks
                        style={{
                            margin: '0.5em', // Reduced margin around each chip
                        }}
                    />
                ))}
            </Stack>

        </div>
    );
};

export default FilterRating;
