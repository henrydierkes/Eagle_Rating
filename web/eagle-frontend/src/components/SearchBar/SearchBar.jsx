import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const categories = [
  { title: 'Library', category: 'Educational' },
  { title: 'Study Spaces', category: 'Educational' },
  { title: 'Parking Lot', category: 'Facilities' },
  { title: 'Dorms', category: 'Accommodations' },
  { title: 'Bathrooms', category: 'Facilities' },
];

function Grouped() {
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
      // Increased width for better visibility and alignment with the search bar
      sx={{ width: '100%', maxWidth: '100%', mr: '1em' }}
      renderInput={(params) => <TextField {...params} label="Select Category" fullWidth />}
    />
  );
}

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
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
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      navigate(`/navigation?search=${inputValue.trim()}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '0.5rem' : '1rem', padding: isMobile ? '0 10px' : '0', width: '100%' }}>      <div className="search-bar" style={{ width: '500%', maxWidth: '500%' }}> 
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
              fullWidth
            />
          )}
        />
      </div>
      <Grouped />
    </div>
  );
};

export default SearchBar;
