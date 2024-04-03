import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure Axios is imported
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import './CommentList.css';

const CommentList = ({ comments }) => {
    const [usersInfo, setUsersInfo] = useState({});

    useEffect(() => {
        const fetchUsersInfo = async () => {
            const userIds = comments.map(comment => comment.userId);
            const userInfoPromises = userIds.map(userId =>
                axios.get(`http://localhost:8080/api/user/get?userID=${userId}`)
            );

            try {
                const userInfoResponses = await Promise.all(userInfoPromises);
                const newUsersInfo = userInfoResponses.reduce((acc, response) => {
                    const user = response.data;
                    acc[user.userIdStr] = {
                        username: user.username || 'Anonymous',
                        avatar: user.avatar || '/images/default-avatar.png' // Use default avatar if none is provided
                    };
                    return acc;
                }, {});
                setUsersInfo(newUsersInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUsersInfo();

        // Cleanup for the useEffect related to adding and removing event listeners
        const handleScroll = (event) => {
            const commentText = event.target;
            const comment = commentText.parentElement;
            if (commentText.scrollHeight - commentText.scrollTop === commentText.clientHeight) {
                comment.style.height = commentText.scrollHeight + 'px';
            }
        };

        const commentElements = document.querySelectorAll('.comment');

        commentElements.forEach((comment) => {
            const commentText = comment.querySelector('.comment-text');
            commentText.addEventListener('scroll', handleScroll);
        });

        return () => {
            commentElements.forEach((comment) => {
                const commentText = comment.querySelector('.comment-text');
                commentText.removeEventListener('scroll', handleScroll);
            });
        };
    }, [comments]); // Ensure useEffect is only re-run if comments change

    const getRatingColor = (rating) => {
        if (rating >= 4) {
            return 'rgba(0, 128, 255, 0.7)'; // blue
        } else if (rating >= 2) {
            return 'rgba(255, 193, 7, 0.7)'; // yellow
        } else {
            return '#F44336'; // red
        }
    };

    // Render method
    return (
        <div className="comment-list">
            {comments.filter(comment => !comment.deleted).map((comment, index) => (
                <div key={comment.ratingIdStr || index} className="comment">
                    <div className="comment-header">
                        <div className="comment-rating-box" style={{ backgroundColor: getRatingColor(comment.overallRating.overall) }}>
                            <span className="comment-rating-number">{comment.overallRating.overall}</span>
                        </div>
                        <div className="profile">
                            <img
                                className="profile-picture"
                                src={usersInfo[comment.userId]?.avatar}
                                alt={`Avatar of ${usersInfo[comment.userId]?.username}`}
                            />
                            <p className="profile-name">
                                {usersInfo[comment.userId]?.username}
                            </p>
                        </div>
                        <p className="date">{new Date(comment.date).toLocaleDateString()}</p>
                    </div>
                    <div className="comment-body">
                        <p className="comment-text" style={{ textAlign: 'center' }}>{comment.comment}</p>
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
