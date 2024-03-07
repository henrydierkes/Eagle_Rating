import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import './CommentList.css';

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <div className="profile">
              <img src={comment.profilePicture} alt="Profile" className="profile-picture" />
              <p className="profile-name">{comment.name}</p>
            </div>
            <p className="date">{comment.date}</p>
          </div>
          <div className="comment-body">
            <div className="ratings">
              <p className="overall-rating">{comment.overallRating}</p>
              <div className="specific-ratings">
                <p>Size: {comment.specificRatings.sizeRating}</p>
                <p>Cleanliness: {comment.specificRatings.cleanlinessRating}</p>
                <p>Quietness: {comment.specificRatings.quietnessRating}</p>
              </div>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
          <div className="comment-footer">
            <button className="upvote" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><ThumbUpIcon sx={{ color: 'success.main' }} /></button>
            <button className="downvote" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><ThumbDownIcon sx={{ color: 'error.main' }} /></button>
            <button className="addComment" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><AddCommentIcon sx={{ color: 'primary.main' }} /></button>
            <button className="share" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><ShareIcon sx={{ color: 'secondary.main' }} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
