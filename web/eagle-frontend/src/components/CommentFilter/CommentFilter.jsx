import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './CommentFilter.css';

const SORT_OPTIONS = [
  // { value: 'relevancy', label: 'Relevancy' },
  { value: 'recency', label: 'Recency' },
  { value: 'popularity', label: 'Popularity' },
];

const CommentFilter = ({ comments, onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState('');
  // console.log("maxmaxmax" + onSortChange.map(comment => comment.likes))
  // console.log("Comments:", JSON.stringify(comments, null, 2));

  const sortComments = (option) => {
    let sortedComments;
    switch(option) {
      // case 'relevancy':
      //   sortedComments = [...comments].sort(/* ... */);
      //   break;
      case 'recency':
        sortedComments = [...comments].sort((a, b) => b.date - a.date);
        break;
      case 'popularity':
        return comments.slice().sort((a, b) => b.likes.length - a.likes.length);
      default:
        sortedComments = [...comments];
    }
    return sortedComments;
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedSort(value);
    const newSortedComments = sortComments(value);
    onSortChange(newSortedComments);
  };


  return (
      <div className="comment-filter">
        <Box sx={{ minWidth: 200, width: 'auto' }}>
          <FormControl fullWidth>
            <InputLabel id="comment-filter-label">Sort by:</InputLabel>
            <Select
                labelId="comment-filter-label"
                id="comment-filter-select"
                value={selectedSort}
                label="Sort by"
                onChange={handleChange}
            >
              {SORT_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
  );
};

export default CommentFilter;
