import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './SearchBar.css';

// Assuming you have a similar list for places in Emory University as we have for films
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
        defaultValue={[placesInEmory[0], placesInEmory[1]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Look for Places"
          />
        )}
        // Adjust this value as needed to move the component to the right
        sx={{ width: '100%', height: '80%', marginLeft: '20px', marginRight: '20px' }} // Adding left margin
      />
    </div>
  );
};


export default SearchBar;
