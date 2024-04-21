import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import './CommentList.css';
import axiosConfig from "../../axiosConfig.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

const CommentList = ({ comment, onThumbsClick }) => {
    const [usersInfo, setUsersInfo] = useState({});
    const [clickStates, setClickStates] = useState({});
    const currentUserId = useAuth().currentUser ? useAuth().currentUser.userId : null;
    const userComment = comment.find(c => c.userId === currentUserId && !c.deleted);
    console.log(currentUserId)
    console.log(comment[0])
    console.log(onThumbsClick)
    useEffect(() => {
        const fetchUsersInfo = async () => {
            const userIds = comment.map(comment => comment.userId);
            const userInfoPromises = userIds.map(userId =>
                axios.get(`${axiosConfig.baseURL}/api/user/get?userID=${userId}`)
            );

            try {
                const userInfoResponses = await Promise.all(userInfoPromises);
                const newUsersInfo = userInfoResponses.reduce((acc, response, index) => {
                    const user = response.data;
                    let username = 'deactivated_user';
                    let avatar = '/images/deactivated-avatar.png';
                    if (user && !user.isDeleted) {
                        username = user.username || user.email;
                        avatar = user.avatar || '/images/default-avatar.jpg';
                    }
                    acc[userIds[index]] = {
                        username: username,
                        avatar: avatar
                    };
                    
                    return acc;
                }, {});
                setUsersInfo(newUsersInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUsersInfo();

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
    }, [comment]);


    const handleThumbsClickLocal = (commentId, type) => {

        setClickStates((prev) => {
            const newState = {
                ...prev,
                [commentId]: {
                    ...prev[commentId],
                    upvote: type === 'upvote' ? !prev[commentId]?.upvote : false,
                    downvote: type === 'downvote' ? !prev[commentId]?.downvote : false,
                },
            };

            if (type === 'upvote' && newState[commentId].upvote) {
                newState[commentId].downvote = false;
            } else if (type === 'downvote' && newState[commentId].downvote) {
                newState[commentId].upvote = false;
            }

            return newState;
        });

        if (currentUserId) {
            onThumbsClick(commentId, type, currentUserId);
        } else {
            console.log('No logged-in user');
        }
    };



    const getRatingColor = (rating) => {
        if (rating >= 4) {
            return 'rgba(0, 128, 255, 0.7)'; // blue
        } else if (rating >= 2) {
            return 'rgba(255, 193, 7, 0.7)'; // yellow
        } else {
            return '#F44336'; // red
        }
    };

    return (
        <div className="comment-list">
            {comment.filter(comment => comment.userId === currentUserId && !comment.deleted).map((userComment, index) => (
                <div key={userComment.ratingIdStr || index} className="comment">
                    <div className="comment-header">
                        <div className="comment-rating-box" style={{ backgroundColor: getRatingColor(userComment.overallRating.overall) }}>
                            <span className="comment-rating-number">{userComment.overallRating.overall}</span>
                        </div>
                        <div className="profile">
                            <img
                                className="profile-picture"
                                src={usersInfo[userComment.userId]?.avatar}
                                alt={`Avatar of ${usersInfo[userComment.userId]?.username}`}
                            />
                            <p className="profile-name">
                                {usersInfo[userComment.userId]?.username}
                            </p>
                        </div>
                        <p className="date">{new Date(userComment.date).toLocaleDateString()}</p>
                    </div>
                    <div className="comment-body">
                        <p className="comment-text" style={{ textAlign: 'center' }}>{userComment.comment}</p>
                    </div>
                    <div className="comment-footer">
                        <button
                            className="upvote"
                            onClick={() => handleThumbsClickLocal(userComment.ratingIdStr || index, 'upvote')}
                            style={{ color: userComment.likes.includes(currentUserId) ? '#6B87FF' : 'inherit' }}
                        >
                            <ThumbUpIcon />
                            <span>{userComment.likeNum}</span>
                        </button>
                        <button
                            className="downvote"
                            onClick={() => handleThumbsClickLocal(userComment.ratingIdStr || index, 'downvote')}
                            style={{ color: userComment.dislikes.includes(currentUserId) ? 'red' : 'inherit' }}
                        >
                            <ThumbDownIcon />
                            <span>{userComment.dislikeNum}</span>
                        </button>
                        <button className="share">
                            <ShareIcon />
                        </button>
                    </div>
                </div>
            ))}
            
            {/* Render other comments */}
            {comment.filter(comment => !comment.deleted && comment.userId !== currentUserId).map((comment, index) => (
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
                        <button
                            className="upvote"
                            onClick={() => handleThumbsClickLocal(comment.ratingIdStr || index, 'upvote')}
                            style={{ color: comment.likes.includes(currentUserId) ? '#6B87FF' : 'inherit' }}
                        >
                            <ThumbUpIcon sx={{ marginTop: '-5px', marginLeft: '5px', marginRight: '10px' }} />
                            <span>{comment.likeNum}</span>
                        </button>
                        <button
                            className="downvote"
                            onClick={() => handleThumbsClickLocal(comment.ratingIdStr || index, 'downvote')}
                            style={{ color: comment.dislikes.includes(currentUserId) ? 'red' : 'inherit' }}
                        >
                            <ThumbDownIcon sx={{ marginTop: '-5px', marginLeft: '5px', marginRight: '10px' }} />
                            <span>{comment.dislikeNum}</span>
                        </button>
                        <button className="share">
                        <ShareIcon sx={{ marginTop: '-5px', marginLeft: '5px' }} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );    
};

export default CommentList;


