import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./LocationForm.css";
import axios from "axios"; // Import Axios
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
  "Charging Ports",
  "Quiet Space",
  "Water Fountain",
  "Among us",
  "Sussy imposter",
];

const LocationForm = ({ location }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [formData, setFormData] = useState({
    placeName: "",
    buildingName: "",
    floorName: "",
    categoryName: "",
    rating: 0,
    size: 0,
    cleanliness: 0,
    quietness: 0,
    tags: [],
    comment: "",
    uploadedImages: [],
    selectedLocation: null, // New state to store selected location
  });

  useEffect(() => {
    if (location) {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    }
  }, [location]);

  // Function to handle location selection
  const handleLocationSelected = (selectedLocation) => {
    setLatitude(selectedLocation.lat());
    setLongitude(selectedLocation.lng());
    setFormData({
      ...formData,
      selectedLocation: {
        lat: selectedLocation.lat(),
        lng: selectedLocation.lng(),
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (name, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleTagsChange = (event) => {
    setFormData({
      ...formData,
      tags: event.target.value,
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
            uploadedImages: imagesArray,
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
    axios
      .post("http://localhost:8080/api/place/add", {
        // Use axios.post instead of fetch
        locName: formData.placeName + " " + formData.buildingName,
        category: formData.categoryName,
        floor: formData.floorName,
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        tags: formData.tags.reduce((acc, tag) => {
          acc[tag] = 1; // Assuming all tags have a count of 1
          return acc;
        }, {}),
        ratingCount: 0, // Assuming there's always at least 1 rating for a new place
        ratingIds: [],
        images: formData.uploadedImages.map((image) => ({ data: image })),
        // totalRating: {
        //   overall: formData.rating,
        //   rating1: formData.size,
        //   rating2: formData.cleanliness,
        //   rating3: formData.quietness
        // },
        isDeleted: false,
        deletedDate: null,
      })
      .then((response) => {
        console.log("Place added successfully:", response.data);
        // Reset form data after successful submission
        setFormData({
          placeName: "",
          buildingName: "",
          floorName: "",
          categoryName: "",
          rating: 0,
          size: 0,
          cleanliness: 0,
          quietness: 0,
          tags: [],
          comment: "",
          uploadedImages: [],
          selectedLocation: location ? location : null,
        });
        useEffect(() => {
          if (location) {
            setLatitude(location.latitude);
            setLongitude(location.longitude);
          }
        }, [location]);
      })
      .catch((error) => {
        console.error("Error adding place:", error);
      });
  };

  return (
    <div className="rating-form">
      <TextField
        sx={{ mb: 1 }}
        className="place-name"
        id="outlined-basic"
        label="Enter Place Name"
        variant="outlined"
        name="placeName"
        value={formData.placeName}
        onChange={handleInputChange}
        required
      />
      <TextField
        sx={{ mb: 1 }}
        className="building-name"
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
        sx={{ mb: 1 }}
        className="floor-name"
        id="outlined-basic"
        label="Enter Floor"
        variant="outlined"
        name="floorName"
        value={formData.floorName}
        onChange={handleInputChange}
      />
      <TextField
        sx={{ mb: 1 }}
        className="category-name"
        id="outlined-basic"
        label="Enter Category"
        variant="outlined"
        name="categoryName"
        value={formData.categoryName}
        onChange={handleInputChange}
      />

      <form onSubmit={handleSubmit}>
        <div className="overall-rating">
          <Typography component="legend">Overall Rating:</Typography>
          <Rating
            name="rating"
            value={formData.rating}
            onChange={(event, newValue) =>
              handleRatingChange("rating", newValue)
            }
          />
        </div>
        <div className="size">
          <Typography component="legend">Size:</Typography>
          <Rating
            name="size"
            value={formData.size}
            onChange={(event, newValue) => handleRatingChange("size", newValue)}
          />
        </div>
        <div className="cleanliness">
          <Typography component="legend">Cleanliness:</Typography>
          <Rating
            name="cleanliness"
            value={formData.cleanliness}
            onChange={(event, newValue) =>
              handleRatingChange("cleanliness", newValue)
            }
          />
        </div>
        <div className="quietness">
          <Typography component="legend">Quietness:</Typography>
          <Rating
            name="quietness"
            value={formData.quietness}
            onChange={(event, newValue) =>
              handleRatingChange("quietness", newValue)
            }
          />
        </div>
        <div>
          <div className="rating-tags">
            <FormControl
              sx={{ m: 1, width: "auto", minWidth: 200, maxWidth: 450 }}
            >
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select
                labelId="tags-label"
                id="tags-select"
                multiple
                value={formData.tags}
                onChange={handleTagsChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
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
        <div className="comment-rating">
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
            <input
              id="upload"
              type="file"
              multiple
              onChange={handleImageChange}
              className="upload-input"
            />
          </label>
          {formData.uploadedImages.map((image, index) => (
            <img
              className="uploaded-image"
              key={index}
              src={image}
              alt={`Uploaded Image ${index + 1}`}
            />
          ))}
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LocationForm;
