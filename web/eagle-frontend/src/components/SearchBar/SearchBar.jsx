import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  // Function to fetch suggestions
  const fetchSuggestions = async (query) => {
    try {
      console.log('Fetching suggestions for query:', query);
      const response = await Axios.get(`http://localhost:8080/api/place/search`, {
        params: { locName: query } // Adjust the parameter based on what your API expects
      });
      console.log('Suggestions:', response.data);
      setOptions(response.data); // Assuming the API returns an array of place objects
    } catch (error) {
      console.error('Error fetching suggestions: ', error);
    }
  };
  const handleKeyPress = (event) => {
    // Check if the 'Enter' key was pressed
    if (event.key === 'Enter') {
      // Navigate to the navigation page with the current input value
      navigate(`/navigation?search=${inputValue}`);
    }
  };
  return (
    <div className="search-bar" style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
      <Autocomplete
        freeSolo
        id="search-bar"
        options={options}
        getOptionLabel={(option) => option.locName}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue.length > 2) { // Fetch suggestions when the user has typed more than 2 characters
            fetchSuggestions(newInputValue);
          } else {
            setOptions([]); // Clear suggestions if the input is cleared or too short
          }
        }}
        onChange={(event, newValue) => {
          if (newValue && newValue.locName) {
            setInputValue(newValue.locName);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Start typing to look for places..."
            onKeyPress={handleKeyPress}
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