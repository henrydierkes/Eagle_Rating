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

    // The render method
    return (
        <div className="comment-list">
            {comments.filter(comment => !comment.deleted).map((comment, index) => (
                <div key={comment.ratingIdStr || index} className="comment">
                    <div className="comment-header">
                        <div className="comment-rating-box" style={{ backgroundColor: getRatingColor(comment.overallRating.overall) }}>
                            <span className="comment-rating-number">{comment.overallRating.overall}</span>
                        </div>
                        <div className="profile">
                            {/* Add a check to ensure comment.user is not undefined before accessing properties */}
                            <img
                                className='profile-picture'
                                src={comment.user?.profilePicture || "/path/to/default/avatar.png"}
                                alt={`Avatar of ${comment.user?.name || "User"}`}
                            />
                            <p className="profile-name">{comment.user?.name || "Anonymous"}</p>
                        </div>
                        <p className="date">{new Date(comment.date).toLocaleDateString()}</p>
                    </div>
                    <div className="comment-body">
                        <p className="comment-text">{comment.text}</p>
                    </div>
                    <div className="comment-footer">
                        <button className="upvote">
                            <ThumbUpIcon />
                            <span>{comment.likes}</span>
                        </button>
                        <button className="downvote">
                            <ThumbDownIcon />
                            <span>{comment.dislikes}</span>
                        </button>
                        <button className="share">
                            <ShareIcon />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
