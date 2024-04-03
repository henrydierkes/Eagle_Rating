import React, {useEffect, useState} from 'react';
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
import './ratingForm.css';
import axios from 'axios';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

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
  'Water Fountain'
];

const RatingForm = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const placeDetails = location.state?.placeDetails;
    console.log(placeDetails);
    const placeName = placeDetails?.locName;
    const placeId=placeDetails?.locIdStr;
      const [tag, setTag] = React.useState([]);
      const [uploadedImages, setUploadedImages] = useState([]);
      const [comment, setComment] = useState('');
    const [ratingType, setRatingType] = useState('total'); // 'total' or 'sub'
    const [formData, setFormData] = useState({
        rating: 0,
        subrating1: 0,
        subrating2: 0,
        subrating3: 0,
    });
    useEffect(() => {
        console.log('formData changed:', formData);
    }, [formData]);
    const handleRatingChange = (name, newValue) => {
        if (ratingType === 'total') {
            // If the rating type is 'Total Rating', clear subratings and update total rating
            setFormData(prevState => ({
                ...prevState,
                [name]: newValue,
                subrating1: 0,
                subrating2: 0,
                subrating3: 0
            }));
        } else {
            // If the rating type is 'Subrating', clear total rating and update subrating
            setFormData(prevState => ({
                ...prevState,
                [name]: newValue,
                rating: 0
            }));
        }
    };

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
    const handleCheckboxChange = (event) => {
        setTags({ ...tags, [event.target.name]: event.target.checked });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Convert the selected tags array to an object with boolean values
        const tagsObject = tags.reduce((obj, item) => {
            obj[item] = tag.includes(item);
            return obj;
        }, {});

        // Prepare the data object based on your database schema
        const ratingData = {
            userId: currentUser.userId, // Replace with actual userId from authentication context
            placeId: placeId, // use the placeId from state
            comment: comment,
            date: new Date(), // Set the current date/time for the rating
            likes: 0, // Initialize likes and dislikes as zero
            dislikes: 0,
            overallRating: {
                overall: formData.rating,
                rating1: formData.subrating1,
                rating2: formData.subrating2,
                rating3: formData.subrating3,
            },
            tags: tagsObject,
            floor: 2, // Set the floor number if applicable, otherwise remove this line
            images: uploadedImages, // assuming you want to upload images as well
        };
        // Retrieve the JWT token from cookies
        const token = Cookies.get('token');

        // If there's a token, proceed with the API call
        if (token) {
            // Create the authorization header using the token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const response = await axios.post('http://localhost:8080/api/rating/addRating', ratingData, config);
                console.log(response.data);
                alert('Rating successfully added!');
                // Clear the form fields here if needed
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to submit rating.');
            }
        } else {
            // Handle the case where the token is not found
            alert('You must be logged in to submit a rating.');
        }
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
      <h2>Rate {placeName}</h2>
      <form onSubmit={handleSubmit}>
        <ToggleButtonGroup
          value={ratingType}
          exclusive
          onChange={(event, newRatingType) => {
              // Check if newRatingType is null or undefined (i.e., if user tries to unclick)
              if (newRatingType !== null && newRatingType !== undefined) {
                  setRatingType(newRatingType);
              }
          }}
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
                  <div className='subrating1'>
                      <Typography component="legend">Size:</Typography>
                      <Rating
                          name="size"
                          value={formData.subrating1}
                          onChange={(event, newValue) => handleRatingChange('subrating1', newValue)}
                      />
                  </div>
                  <div className='subrating2'>
                      <Typography component="legend">Cleanliness:</Typography>
                      <Rating
                          name="cleanliness"
                          value={formData.subrating2}
                          onChange={(event, newValue) => handleRatingChange('subrating2', newValue)}
                      />
                  </div>
                  <div className='subrating3'>
                      <Typography component="legend">Quietness:</Typography>
                      <Rating
                          name="quietness"
                          value={formData.subrating3}
                          onChange={(event, newValue) => handleRatingChange('subrating3', newValue)}
                      />
                  </div>
              </>
          )}
      <div>
    <div className='rating-tags'>
      <FormControl sx={{ mt: 1, width: 'auto', minWidth: 200, maxWidth: 450}}>
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
                value={comment} // Make sure to control the input with the state
                onChange={(e) => setComment(e.target.value)} // Update the state when the input changes
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

export default RatingForm;