import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './LocationForm.css';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



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

const tags = [
  'Charging Ports',
  'Quiet Space',
  'Water Fountain',
  'Among us',
  'Sussy imposter'
];



const toggleRatingVisibility = () => {
  setIsRatingVisible(!isRatingVisible);
};

const LocationForm = () => {
  const [formData, setFormData] = useState({
    placeName: '',
    buildingName: '',
    floorName: '',
    categoryName: '',
    rating: 0,
    size: 0,
    cleanliness: 0,
    quietness: 0,
    tags: [],
    comment: '',
    uploadedImages: []
  });

  // 新增的状态和设置这个状态的函数
  const [isRatingVisible, setIsRatingVisible] = useState(false);

  const [ratingType, setRatingType] = useState("total"); // 初始值为 "total"



  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRatingChange = (name, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleTagsChange = (event) => {
    setFormData({
      ...formData,
      tags: event.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagesArray.push(event.target.result);
        if (imagesArray.length === files.length) {
          setFormData({
            ...formData,
            uploadedImages: imagesArray
          });
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/place/add', {  // Use axios.post instead of fetch
      locName: formData.placeName + ' ' + formData.buildingName,
      category: formData.categoryName,
      floor: formData.floorName,
      location: null,
      tags: formData.tags.reduce((acc, tag) => {
        acc[tag] = 1; // Assuming all tags have a count of 1
        return acc;
      }, {}),
      ratingCount: 0, // Assuming there's always at least 1 rating for a new place
      ratingIds: [],
      images: formData.uploadedImages.map(image => ({data: image})),
      // totalRating: {
      //   overall: formData.rating,
      //   rating1: formData.size,
      //   rating2: formData.cleanliness,
      //   rating3: formData.quietness
      // },
      isDeleted: false,
      deletedDate: null
    })
        .then(response => {
          console.log('Place added successfully:', response.data);
          // Reset form data after successful submission
          setFormData({
            placeName: '',
            buildingName: '',
            floorName: '',
            categoryName: '',
            rating: 0,
            size: 0,
            cleanliness: 0,
            quietness: 0,
            tags: [],
            comment: '',
            uploadedImages: []
          });
        })
        .catch(error => {
          console.error('Error adding place:', error);
        });
  };

  return (
      <div className="rating-form">
        <TextField
            sx={{ mb: 1}}
            className='place-name'
            id="outlined-basic"
            label="Enter Place Name"
            variant="outlined"
            name="placeName"
            value={formData.placeName}
            onChange={handleInputChange}
            required
        />
        <TextField
            sx={{ mb: 1}}
            className='building-name'
            id="outlined-basic"
            label="Enter Building"
            variant="outlined"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleInputChange}
        />
        <TextField
            sx={{ mb: 1}}
            className='floor-name'
            id="outlined-basic"
            label="Enter Floor"
            variant="outlined"
            name="floorName"
            value={formData.floorName}
            onChange={handleInputChange}
        />
        <TextField
            sx={{ mb: 1}}
            className='category-name'
            id="outlined-basic"
            label="Enter Category"
            variant="outlined"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
        />


        {/* Toggle Button for Ratings Visibility */}
        <Button onClick={() => setIsRatingVisible(!isRatingVisible)} style={{marginBottom: '1rem'}}>
          Add Rating
        </Button>



        {/* Conditional Rendering based on isRatingVisible state */}
        {isRatingVisible && (
            <>
              <ToggleButtonGroup
                  value={ratingType}
                  exclusive
                  onChange={(event, newRatingType) => setRatingType(newRatingType)}
                  aria-label="rating type"
                  sx={{ mb: 1 }}
              >
                <ToggleButton value="total" aria-label="left aligned">
                  Total Rating
                </ToggleButton>
                <ToggleButton value="sub" aria-label="centered">
                  Subrating
                </ToggleButton>
              </ToggleButtonGroup>


              {ratingType === 'total' && (
                  <div className='overall-rating'>
                    <Typography component="legend">Overall Rating:</Typography>
                    <Rating
                        name="rating"
                        value={formData.rating}
                        onChange={(event, newValue) => handleRatingChange('rating', newValue)}
                    />
                  </div>
              )}
              {ratingType === 'sub' && (
                  <>
                  <div className='size'>
                    <Typography component="legend">Size:</Typography>
                    <Rating
                        name="size"
                        value={formData.size}
                        onChange={(event, newValue) => handleRatingChange('size', newValue)}
                    />
                  </div>
                  <div className='cleanliness'>
                    <Typography component="legend">Cleanliness:</Typography>
                    <Rating
                        name="cleanliness"
                        value={formData.cleanliness}
                        onChange={(event, newValue) => handleRatingChange('cleanliness', newValue)}
                    />
                  </div>
                  <div className='quietness'>
                    <Typography component="legend">Quietness:</Typography>
                    <Rating
                        name="quietness"
                        value={formData.quietness}
                        onChange={(event, newValue) => handleRatingChange('quietness', newValue)}
                    />
                  </div>
                  </>
                )}
            </>
              )}

        <div>
          <div className='rating-tags'>
            <FormControl sx={{ m: 1, width: 'auto', minWidth: 200, maxWidth: 450}}>
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select
                  labelId="tags-label"
                  id="tags-select"
                  multiple
                  value={formData.tags}
                  onChange={handleTagsChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
              >
                {tags.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={formData.tags.indexOf(name) > -1} />
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
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
          />
        </div>
        <div className="upload-images">
          <label htmlFor="upload" className="upload-label">
            <span>Upload Image</span>
            <input id="upload" type="file" multiple onChange={handleImageChange} className="upload-input" />
          </label>
          {formData.uploadedImages.map((image, index) => (
              <img className='uploaded-image'key={index} src={image} alt={`Uploaded Image ${index + 1}`} />
          ))}
        </div>
        <button className='submit-button' type="submit">Submit</button>
      </div>
  );
};

export default LocationForm;
