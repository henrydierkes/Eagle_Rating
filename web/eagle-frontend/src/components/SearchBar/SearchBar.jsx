import React, { useState } from 'react';
import Axios from 'axios'; // Ensure Axios is used for future expansions, such as fetching from an API.
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

// Categories array for the dropdown and search suggestions.
const categories = [
  { title: 'Library', category: 'Educational' },
  { title: 'Study Spaces', category: 'Educational' },
  { title: 'Parking Lot', category: 'Facilities' },
  { title: 'Dorms', category: 'Accommodations' },
  { title: 'Bathrooms', category: 'Facilities' },
];

function Grouped() {
  // Using the full category name for grouping, decreased width to 180px.
  const options = categories.map((option) => ({
    ...option,
    category: option.category,
  }));

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.category.localeCompare(a.category))}
      groupBy={(option) => option.category}
      getOptionLabel={(option) => option.title}
      sx={{ width: 180 }} // Decreased width for categories
      renderInput={(params) => <TextField {...params} label="Select Category" />}
    />
  );
}

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const fetchSuggestions = async (query) => {
    try {
      const filteredOptions = categories.filter((option) =>
        option.title.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(filteredOptions);
    } catch (error) {
      console.error('Error fetching suggestions: ', error);
    }
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 2) {
      fetchSuggestions(newInputValue);
    } else {
      setOptions([]);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      navigate(`/navigation?search=${inputValue.trim()}`);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '47em' }}>
      <div className="search-bar" style={{ flexGrow: 1, maxWidth: '100%' }}> 
        <Autocomplete
          freeSolo
          id="search-bar"
          options={options.map(option => option.title)}
          onInputChange={onInputChange}
          onChange={(event, newValue) => {
            navigate(`/navigation?search=${newValue}`);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Start typing to look for places..."
              onKeyDown={onKeyDown}
              InputProps={{
                ...params.InputProps,
                endAdornment: <SearchIcon />,
              }}
            />
          )}
          sx={{ width: '1020%' }} 
        />
      </div>
      <Grouped />
    </div>
  );
};

export default SearchBar;
