import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

const placesInEmory = [
  { title: 'Woodruff Library' },
  { title: 'Cox Hall' },
  { title: 'Emory Student Center' },
  { title: 'Mathematics and Science Center'},
  { title: 'Atwood Chemistry Center'},
  { title: 'White Hall'},
  { title: 'Harris Hall'}
];

const SearchBar = () => {
  return (
    <div className="search-bar" style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
      <Autocomplete
        multiple
        limitTags={2}
        id="tags-limit-search"
        options={placesInEmory}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Starting typing to look for places!"
   
          />
        )}
        sx={{ width: '100%', height: '80%', marginLeft: '20px', marginRight: '20px' }}
      />
    </div>
  );
};

export default SearchBar;
