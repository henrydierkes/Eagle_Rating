import React, { useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import './CommentList.css';

const CommentList = ({ comments }) => {


  useEffect(() => {
    const handleScroll = (event) => {
      const commentText = event.target;
      const comment = commentText.parentElement;
      if (commentText.scrollHeight - commentText.scrollTop === commentText.clientHeight) {
        comment.style.height = commentText.scrollHeight + 'px';
      }
    };

    const comments = document.querySelectorAll('.comment');

    comments.forEach((comment) => {
      const commentText = comment.querySelector('.comment-text');
      commentText.addEventListener('scroll', handleScroll);
    });

    return () => {
      comments.forEach((comment) => {
        const commentText = comment.querySelector('.comment-text');
        commentText.removeEventListener('scroll', handleScroll);
      });
    };
  }, []);

  const getPercentage = (rating) => `${(rating / 5) * 100}%`;

  const getRatingColor = (rating) => {
        if (rating >= 4) {
            return '#4CAF50'; // green
        } else if (rating >= 3) {
            return '#CDDC39'; // lime
        } else if (rating >= 2) {
            return '#FFC107'; // amber
        } else {
            return '#F44336'; // red
        }
    };

  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <div className="comment-rating-box" style={{ backgroundColor: getRatingColor(comment.overallRating) }}>
                        <span className="comment-rating-number">{comment.overallRating}</span>
                    </div>
                    <div className="profile">
                      <div className='picAndName'>
                        <img className='profile-picture' src={comment.user.profilePicture} alt={`Avatar of ${comment.user.name}`} />
                        <p className="profile-name">{comment.user.name}</p>
                      </div>
                    </div>
            <p className="date">{comment.datePosted}</p>
          </div>
          <div className="comment-body">
          </div>
            <div className="ratings">
            <p className="comment-text">{comment.comment}</p>
          </div>
          <div className="comment-footer">
            <button className="upvote" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><ThumbUpIcon sx={{ color: 'success.main' }} /></button>
            <button className="downvote" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><ThumbDownIcon sx={{ color: 'error.main' }} /></button>
            {/* <button className="addComment" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><AddCommentIcon sx={{ color: 'primary.main' }} /></button> */}
            <button className="share" sx={{ border: 'none', background: 'none', cursor: 'pointer', outline: 'none', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}><ShareIcon sx={{ color: 'secondary.main' }} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
