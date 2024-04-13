import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure Axios is imported
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import './CommentList.css';
import axiosConfig from "../../axiosConfig.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";

const CommentList = ({ comment, onThumbsClick }) => {
    const [usersInfo, setUsersInfo] = useState({});
    const [clickStates, setClickStates] = useState({});
    const currentUserId = useAuth().currentUser.userId;
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
    }, [comment]); // Ensure useEffect is only re-run if comments change

    // 直接调用父组件传递的 onThumbsClick 函数
    const handleThumbsClickLocal = (commentId, type) => {
        // 更新 clickStates 以反映新的点击状态
        setClickStates((prev) => {
            const newState = {
                ...prev,
                [commentId]: {
                    ...prev[commentId],
                    upvote: type === 'upvote' ? !prev[commentId]?.upvote : false,
                    downvote: type === 'downvote' ? !prev[commentId]?.downvote : false,
                },
            };

            // 确保同时取消另一种状态
            if (type === 'upvote' && newState[commentId].upvote) {
                newState[commentId].downvote = false;
            } else if (type === 'downvote' && newState[commentId].downvote) {
                newState[commentId].upvote = false;
            }

            return newState;
        });

        // 调用父组件传递的 onThumbsClick 函数，以更新服务器上的数据
        if (currentUserId) {
            onThumbsClick(commentId, type, currentUserId);
        } else {
            // Handle the case where there is no logged-in user
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

    // Render method
    return (
        <div className="comment-list">
            {comment.filter(comment => !comment.deleted).map((comment, index) => (
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
                            <ThumbUpIcon />
                            <span>{comment.likeNum}</span>
                        </button>
                        <button
                            className="downvote"
                            onClick={() => handleThumbsClickLocal(comment.ratingIdStr || index, 'downvote')}
                            style={{ color: comment.dislikes.includes(currentUserId) ? 'red' : 'inherit' }}
                        >
                            <ThumbDownIcon />
                            <span>{comment.dislikeNum}</span>
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

