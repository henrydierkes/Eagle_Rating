import React, {useEffect, useState} from 'react';
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
import Map from "../Map/Map";



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

const LocationForm = ({ location }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [formData, setFormData] = useState({
    placeName: "",
    buildingName: "",
    floor: 1,
    categoryName: "",
    rating: 0,
    subRating1: 0,
    subRating2: 0,
    subRating3: 0,
    tags: [],
    comment: "",
    uploadedImages: [],
    selectedLocation:null,

  });
  useEffect(() => {
    if (location) {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    }
  }, [location]);
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
    console.log(name, newValue); // This should log the name of the rating and the new value
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
    console.log("Latitude on submit:", latitude);
    console.log("Longitude on submit:", longitude);
    const userId = '65f63e365aaca164fc0ddb41';// hard code userID; need to retrive from website later.
    const tagsObject = formData.tags.reduce((obj, item) => {
      obj[item] = 1; // You can set any value, here I've used 1 as an example
      return obj;
    }, {});
    const placeForm={
      locName: formData.placeName + '-' + formData.buildingName,
      category: formData.categoryName,
      floor: formData.floor,
      location: {
        longitude,
        latitude,
      },
      images: formData.uploadedImages.map(image => ({data: image})),
      totalRating: {
        overall: formData.rating,
        rating1: formData.subRating1,
        rating2: formData.subRating2,
        rating3: formData.subRating3,
      },
      tags:tagsObject,
      isDeleted: false,
      deletedDate: null,
    }
    const finalForm={
      'place':placeForm,
      'userId': userId,
      'comment': formData.comment.toString(),
    }
    axios.post('http://localhost:8080/api/place/add', finalForm)
        .then(response => {
          console.log('Place added successfully:', response.data);
          // Reset form data after successful submission
          setFormData({
            placeName: '',
            buildingName: '',
            floor: 1,
            categoryName: '',
            rating: 0,
            subRating1: 0,
            subRating2: 0,
            subRating3: 0,
            tags: [],
            comment: '',
            uploadedImages: [],
            selectedLocation: location ? location : null,
          });

        })
        .catch(error => {
          console.error('Error adding place:', error);
        });
  };

  return (
      <div className="rating-form">
        <TextField
            sx={{ mt: 2, mb: 1}}
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
            sx={{ mt: 2, mb: 1}}
            className='building-name'
            id="outlined-basic"
            label="Enter Building"
            variant="outlined"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleInputChange}
        />
        <div>
          <label>Select Location on Map:</label>
          {/* <Map onLocationSelected={handleLocationSelected} /> */}
          <Map setLatitude={setLatitude} setLongitude={setLongitude} />
          {formData.selectedLocation && (
              <div>
                Latitude: {formData.selectedLocation.lat}, Longitude:{" "}
                {formData.selectedLocation.lng}
              </div>
          )}
        </div>
        <TextField
            sx={{ mt: 2, mb: 1}}
            className='floo'
            id="outlined-basic"
            label="Enter Floor"
            variant="outlined"
            name="floor"
            value={formData.floor}
            onChange={handleInputChange}
        />
        <TextField
            sx={{ mt: 2, mb: 1}}
            className='category-name'
            id="outlined-basic"
            label="Enter Category"
            variant="outlined"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
        />

        <form onSubmit={handleSubmit}>
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
              <ToggleButton value="total" aria-label="left aligned" sx={{ width: '15.5rem' }} >
                    Total Rating
                  </ToggleButton>
                  <ToggleButton value="sub" aria-label="centered" sx={{ width: '15.5rem' }}>
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
                      <div className='subRating1'>
                        <Typography component="legend">Size:</Typography>
                        <Rating
                            name="size"
                            value={formData.subRating1}
                            onChange={(event, newValue) => handleRatingChange('subRating1', newValue)}
                        />
                      </div>
                      <div className='subRating2'>
                        <Typography component="legend">Cleanliness:</Typography>
                        <Rating
                            name="cleanliness"
                            value={formData.subRating2}
                            onChange={(event, newValue) => handleRatingChange('subRating2', newValue)}
                        />
                      </div>
                      <div className='subRating3'>
                        <Typography component="legend">Quietness:</Typography>
                        <Rating
                            name="quietness"
                            value={formData.subRating3}
                            onChange={(event, newValue) => handleRatingChange('subRating3', newValue)}
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
        </form>
      </div>
  );
};

export default LocationForm;