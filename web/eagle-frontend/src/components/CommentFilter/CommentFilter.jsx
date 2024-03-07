import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './CommentFilter.css';

const CommentFilter = ({ onSortChange }) => {
  const [sortingOption, setSortingOption] = useState('');

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSortingOption(selectedOption);
    onSortChange(selectedOption);
  };

  return (
    <div className="comment-filter">
      <Box sx={{  minWidth: 160, width: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel id="comment-filter-label">Sort by:</InputLabel>
          <Select
            labelId="comment-filter-label"
            id="comment-filter-select"
            value={sortingOption}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value="relevancy">Relevancy</MenuItem>
            <MenuItem value="recency">Recency</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default CommentFilter;
