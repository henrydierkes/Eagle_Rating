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
import './CommentForm.css';
import axios from 'axios';

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
  'Water Fountain'
];

const CommentForm = () => {
  const [rating, setRating] = useState(0);
  const [size, setSize] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [quietness, setQuietness] = useState(0);
  const [tag, setTag] = React.useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [comment, setComment] = useState('');

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
            userId: "65d574294bb7330ced78f1ba", // Replace with actual userId from authentication context
            placeId: "65ea0d2312a27f0061751baa", // Replace with actual placeId relevant to the rating
            comment: comment,
            date: new Date(), // Set the current date/time for the rating
            likes: 0, // Initialize likes and dislikes as zero
            dislikes: 0,
            overallRating: {
                overall: rating,
                rating1: cleanliness,
                rating2: quietness,
                rating3: size,
            },
            tags: tagsObject,
            floor: 2, // Set the floor number if applicable, otherwise remove this line
        };

        try {
            const response = await axios.post('http://localhost:8080/api/rating/addRating', ratingData);

            console.log(response.data);
            alert('Rating successfully added!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit rating.');
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
      <h2>Rate {results[0].title}</h2>
      <form onSubmit={handleSubmit}>
        <div className='overall-rating'>
          <Typography component="legend">Overall Rating:</Typography>
          <Rating
            // precision={0.5}
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

export default CommentForm;