import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './LocationForm.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const results = [
  { id: 1, title: "Place 567", description: "Description for Result 1", rating: 4.5, num_rate: 33, location: '1400 Emory Street', top_tags: ['tables', 'chairs'], size: 5, clean: 5, quiet: 5, building: 'Building A', floor: '2nd floor'},
];

const tags = [
  'Charging Ports',
  'Quiet Space',
  'Water Fountain',
  'Among us',
  'Sussy imposter'
];

const LocationForm = () => {
  const [rating, setRating] = useState(0);
  const [size, setSize] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [quietness, setQuietness] = useState(0);
  const [tag, setTag] = React.useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);


  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagesArray.push(event.target.result);
        if (imagesArray.length === files.length) {
          setUploadedImages(imagesArray);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      rating,
      size,
      cleanliness,
      quietness,
      images,
    });
  };

  const handleTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="rating-form">
      <TextField sx={{ mb: 1}} className='place-name' id="outlined-basic" label="Enter Place Name" variant="outlined" required/>
      <TextField sx={{ mb: 1}} className='building-name' id="outlined-basic" label="Enter Building" variant="outlined" />
      <TextField sx={{ mb: 1}} className='floor-name' id="outlined-basic" label="Enter Floor" variant="outlined" />

      <form onSubmit={handleSubmit}>
        <div className='overall-rating'>
          <Typography component="legend">Overall Rating:</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <div className='size'>
          <Typography component="legend">Size:</Typography>
          <Rating
            name="size"
            value={size}
            onChange={(event, newValue) => {
              setSize(newValue);
            }}
          />
        </div>
        <div className='cleanliness'>
          <Typography component="legend">Cleanliness:</Typography>
          <Rating
            name="cleanliness"
            value={cleanliness}
            onChange={(event, newValue) => {
              setCleanliness(newValue);
            }}
          />
        </div>
        <div className='quietness'>
          <Typography component="legend">Quietness:</Typography>
          <Rating
            name="quietness"
            value={quietness}
            onChange={(event, newValue) => {
              setQuietness(newValue);
            }}
          />
        </div>
      <div>
    <div className='rating-tags'>
      <FormControl sx={{ m: 1, width: 'auto', minWidth: 200, maxWidth: 450}}>
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          id="tags-select"
          multiple
          value={tag}
          onChange={handleTagsChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {tags.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={tag.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    </div>
        <div className='comment-rating'>
          <TextField
          id="filled-textarea"
          label="Comment"
          placeholder="Type comment here"
          multiline
          variant="filled"
        />
        </div>
        <div className="upload-images">
          <label htmlFor="upload" className="upload-label">
            <span>Upload Image</span>
            <input id="upload" type="file" multiple onChange={handleImageChange} className="upload-input" />
          </label>
          {uploadedImages.map((image, index) => (
          <img className='uploaded-image'key={index} src={image} alt={`Uploaded Image ${index + 1}`} />
          ))}
        </div>

        <button className='submit-button' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LocationForm;
