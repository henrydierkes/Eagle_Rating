import React from 'react';
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
                <p>Size: {comment.sizeRating}</p>
                <p>Cleanliness: {comment.cleanlinessRating}</p>
                <p>Quietness: {comment.quietnessRating}</p>
              </div>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
          <div className="comment-footer">
            <button className="upvote">Upvote</button>
            <button className="downvote">Downvote</button>
            <button className="comment">Comment</button>
            <button className="share">Share</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
