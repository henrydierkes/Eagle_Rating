import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const categories = [
  { title: 'Study Space', category: 'Educational' },
  { title: 'Building', category: 'Facilities' },
  { title: 'Parking Lot', category: 'Facilities' },
  { title: 'Dorm', category: 'Accommodations' },
  { title: 'Bathroom', category: 'Facilities' },
];

function Grouped({ onCategoryChange }) {
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
      onChange={onCategoryChange}
      sx={{ width: '100%', maxWidth: '100%', mr: { xs: '0', sm: '1em' } }}
      renderInput={(params) => <TextField {...params} label="Select Category" fullWidth />}
    />
  );
}

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchSuggestions = async (query) => {
    const filteredOptions = categories.filter((option) =>
      option.title.toLowerCase().includes(query.toLowerCase())
    );
    setOptions(filteredOptions);
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
    if (event.key === 'Enter') {
      event.preventDefault();
      let queryParams = '';
      if (inputValue.trim() || selectedCategory) {
        if (inputValue.trim()) {
          queryParams += `locName=${inputValue.trim()}&`;
        }
        if (selectedCategory) {
          queryParams += `category=${selectedCategory.title}`;
        }
      } else {
        queryParams = '';
      }
      navigate(`/navigation?${queryParams}`);
    }
  };

  const onCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '0.5rem' : '1rem', padding: isMobile ? '0.5rem' : '0', width: '100%' }}>
      <div className={isMobile ? "mobile-search-bar" : "search-bar"} style={{ width: isMobile ? '100%' : '500%', maxWidth: isMobile ? '500px' : '500%' }}>
        <Autocomplete
          freeSolo
          id="search-bar"
          options={options.map(option => option.title)}
          onInputChange={onInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search for places..."
              onKeyDown={onKeyDown}
              InputProps={{
                ...params.InputProps,
                endAdornment: <SearchIcon />,
              }}
              fullWidth
            />
          )}
        />
      </div>
      <Grouped onCategoryChange={onCategoryChange} />
    </div>
  );
};

export default SearchBar;
