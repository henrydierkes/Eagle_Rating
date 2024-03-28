import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  // Function to fetch suggestions
  const fetchSuggestions = async (query) => {
    try {
      const response = await Axios.get(`http://localhost:8080/api/place/search`, {
        params: { locName: query }
      });
      setOptions(response.data);
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
      // Prevent the default form submission if inside a form
      event.preventDefault();
      navigate(`/navigation?search=${inputValue.trim()}`);
    }
  };

  return (
    <div className="search-bar" style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
      <Autocomplete
        freeSolo
        id="search-bar"
        options={options}
        getOptionLabel={(option) => option.locName || ''}
        onInputChange={onInputChange}
        onChange={(event, newValue) => {
          if (newValue && typeof newValue === 'object' && newValue.locName) {
            setInputValue(newValue.locName);
            navigate(`/navigation?search=${newValue.locName}`);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Start typing to look for places..."
            onKeyDown={onKeyDown}
            InputProps={{
              ...params.InputProps,
              endAdornment: <SearchIcon position="end" />,
            }}
          />
        )}
        sx={{ width: '100%', height: '80%', marginLeft: '20px', marginRight: '20px' }}
      />
    </div>
  );
};

export default SearchBar;
