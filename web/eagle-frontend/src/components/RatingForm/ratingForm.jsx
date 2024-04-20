import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import axios from 'axios';
import Cookies from 'js-cookie';
import axiosConfig from '../../axiosConfig.jsx';
import { useAuth } from '../../contexts/AuthContext';
import SubratingData from '../../../public/jsons/Subrating.json';
import './ratingForm.css';

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

const MAX_FILE_SIZE_MB = 20;

const RatingForm = () => {
    const staticTags = ['Water Fountain', 'Charging Port', 'Busy', 'Quiet', 'Parking Space'];
    const { currentUser } = useAuth();
    const location = useLocation();
    const placeDetails = location.state?.placeDetails;
    const currentSubratings = SubratingData.categories.find(cat => cat.category === placeDetails?.category)?.subratings || {};
    const placeName = placeDetails?.locName;
    const placeId = placeDetails?.locIdStr;

    const [tag, setTag] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [comment, setComment] = useState('');
    const [ratingType, setRatingType] = useState('total');
    const [formData, setFormData] = useState({
        rating: 0,
        subrating1: 0,
        subrating2: 0,
        subrating3: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [uploadErrors, setUploadErrors] = useState([]);
    const [submissionError, setSubmissionError] = useState('');

    const navigate = useNavigate();

    // Handle changes in ratings
    const handleRatingChange = (name, newValue) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue,
            ...(ratingType === 'total' ? { subrating1: 0, subrating2: 0, subrating3: 0 } : { rating: 0 }),
        }));
    };

    // Handle image changes
    const handleImageChange = (e) => {
        // Convert FileList to array
        const files = Array.from(e.target.files);
        const allowedFiles = [];
        const errors = [];

        // Validate files
        files.forEach(file => {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                errors.push(`File "${file.name}" exceeds the maximum file size limit of ${MAX_FILE_SIZE_MB} MB.`);
            } else {
                allowedFiles.push(file);
            }
        });

        // Update state with allowed files and errors
        setUploadedImages(allowedFiles);
        setUploadErrors(errors);
    };

    // Handle changes in tags
    const handleTagsChange = (event) => {
        const { value } = event.target;
        setTag(typeof value === 'string' ? value.split(',') : value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.rating && !formData.subrating1 && !formData.subrating2 && !formData.subrating3) {
            alert('Please provide a rating.');
            return;
        }

        setIsLoading(true);
        setSubmissionError('');

        try {
            const token = Cookies.get('token');
            if (!token) {
                throw new Error('Authentication error. Please log in and try again.');
            }

            const addRatingRequest = createRatingRequest();
            const existingRatingId = await checkExistingRating(token);

            if (existingRatingId) {
                const update = window.confirm('You have already rated this place. Would you like to update your rating?');
                if (!update) {
                    setIsLoading(false);
                    return;
                }
                await deleteExistingRating(token, existingRatingId);
            }

            const ratingId = await submitRating(token, addRatingRequest);
            if (uploadedImages.length > 0) {
                // Convert uploadedImages to an array if it's not already an array
                const imagesArray = Array.isArray(uploadedImages) ? uploadedImages : Array.from(uploadedImages);

                // Call uploadImages with imagesArray
                await uploadImages(ratingId, imagesArray, token);
            }

            alert('Rating submitted successfully!');
            navigate(`/ratingpage/${placeId}`);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionError(error.message || 'Failed to submit rating. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    // Create a rating request object
    const createRatingRequest = () => ({
        userId: currentUser.userId,
        placeId: placeId,
        comment,
        date: new Date().toISOString(),
        overallRating: {
            overall: formData.rating,
            rating1: formData.subrating1,
            rating2: formData.subrating2,
            rating3: formData.subrating3,
        },
        tags: staticTags.reduce((obj, tagName) => {
            obj[tagName] = tag.includes(tagName);
            return obj;
        }, {}),
    });

    // Check if user has already rated the place
    const checkExistingRating = async (token) => {
        const response = await axios.get(`${axiosConfig.baseURL}/api/rating/userHasRated`, {
            params: { userId: currentUser.userId, placeId },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data ? response.data.ratingIdStr : null;
    };

    // Delete existing rating
    const deleteExistingRating = async (token, ratingId) => {
        await axios.delete(`${axiosConfig.baseURL}/api/rating/delete`, {
            params: { ratingId },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    // Submit the rating to the server
    const submitRating = async (token, ratingRequest) => {
        const response = await axios.post(`${axiosConfig.baseURL}/api/rating/addRating`, ratingRequest, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.ratingId;
    };

    // Upload images associated with the rating
    const uploadImages = async (ratingId, images, token) => {
        try {
            // Create a FormData object and append the ratingId and images
            const formData = new FormData();
            formData.append('ratingId', ratingId);

            // Append each image to the FormData object
            images.forEach((image, index) => {
                formData.append(`images`, image, image.name);
            });

            // Make a POST request to upload images
            const response = await axios.post(
                `${axiosConfig.baseURL}/api/rating/uploadImage`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Images uploaded successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading images:', error);
            if (error.response && error.response.data) {
                console.error('Error response data:', error.response.data);
                throw new Error(`Failed to upload images: ${error.response.data}`);
            }
            throw error;
        }
    };




    return (
        <div className="rating-form">
            <h2>Rate {placeName}</h2>
            <form onSubmit={handleSubmit}>
                <ToggleButtonGroup
                    value={ratingType}
                    exclusive
                    onChange={(event, newRatingType) => {
                        if (newRatingType) {
                            setRatingType(newRatingType);
                        }
                    }}
                    aria-label="rating type"
                    sx={{mb: 1}}
                >
                    <ToggleButton value="total" aria-label="total" sx={{width: '15.5rem'}}>
                        Total Rating
                    </ToggleButton>
                    <ToggleButton value="sub" aria-label="sub" sx={{width: '15.5rem'}}>
                        Subrating
                    </ToggleButton>
                </ToggleButtonGroup>

                {ratingType === 'total' && (
                    <div className="overall-rating">
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
                        {Object.entries(currentSubratings).map(([key, label], index) => {
                            const subratingKey = `subrating${index + 1}`;
                            return (
                                <div key={key} className={`subrating${index + 1}`}>
                                    <Typography component="legend">{label}:</Typography>
                                    <Rating
                                        name={label.toLowerCase()}
                                        value={formData[subratingKey]}
                                        onChange={(event, newValue) => handleRatingChange(subratingKey, newValue)}
                                    />
                                </div>
                            );
                        })}
                    </>
                )}

                <div className="rating-tags">
                    <FormControl sx={{mt: 1, width: 'auto', minWidth: 200, maxWidth: 450}}>
                        <InputLabel id="tags-label">Tags</InputLabel>
                        <Select
                            labelId="tags-label"
                            id="tags-select"
                            multiple
                            value={tag}
                            onChange={handleTagsChange}
                            input={<OutlinedInput label="Tag"/>}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {staticTags.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={tag.indexOf(name) > -1}/>
                                    <ListItemText primary={name}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="comment-rating">
                    <TextField
                        id="filled-textarea"
                        label="Comment"
                        placeholder="Type comment here"
                        multiline
                        variant="filled"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className="upload-images">
                    <label htmlFor="upload" className="upload-label">
                        <span>Upload Image</span>
                        <input
                            id="upload"
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="upload-input"
                        />
                    </label>
                    {uploadErrors.length > 0 && (
                        <div className="error-message">
                            {uploadErrors.join(', ')}
                        </div>
                    )}
                    {uploadedImages.map((image, index) => (
                        <div key={index} className="uploaded-image-wrapper">
                            <img
                                className="uploaded-image"
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded Image ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <button className="submit-button" type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default RatingForm;
