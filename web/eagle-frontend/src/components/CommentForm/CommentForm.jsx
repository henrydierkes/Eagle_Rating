import React, { useState } from 'react';
import './CommentForm.css';

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [size, setSize] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [quietness, setQuietness] = useState(0);
  const [tags, setTags] = useState([]);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
  };

  const handleCleanlinessChange = (e) => {
    setCleanliness(parseInt(e.target.value));
  };

  const handleQuietnessChange = (e) => {
    setQuietness(parseInt(e.target.value));
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value.split(','));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setImages(fileList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      rating,
      size,
      cleanliness,
      quietness,
      tags,
      comment,
      images,
    });
  };

  return (
    <div className="rating-form">
      <h2>Rate This Place</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input type="number" min="0" max="5" value={rating} onChange={handleRatingChange} />
        </div>
        <div>
          <label>Size:</label>
          <input type="number" min="0" max="5" value={size} onChange={handleSizeChange} />
        </div>
        <div>
          <label>Cleanliness:</label>
          <input type="number" min="0" max="5" value={cleanliness} onChange={handleCleanlinessChange} />
        </div>
        <div>
          <label>Quietness:</label>
          <input type="number" min="0" max="5" value={quietness} onChange={handleQuietnessChange} />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input type="text" value={tags.join(',')} onChange={handleTagsChange} />
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={handleCommentChange} />
        </div>
        <div>
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RatingForm;
