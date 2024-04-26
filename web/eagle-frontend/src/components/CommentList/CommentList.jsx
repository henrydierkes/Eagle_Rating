import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import './CommentList.css';
import axiosConfig from "../../axiosConfig.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

const useStyles = makeStyles((theme) => ({
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: theme.spacing(5),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(0.2),
    }
  }));

const CommentList = ({ comment, onThumbsClick }) => {
    const classes = useStyles();
    const [usersInfo, setUsersInfo] = useState({});
    const [clickStates, setClickStates] = useState({});
    const { currentUser } = useAuth();
    const currentUserId = useAuth().currentUser ? useAuth().currentUser.userId : null;
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedText, setEditedText] = useState("");
    // console.log(currentUserId)
    // console.log(comment[0])
    // console.log(onThumbsClick)

    useEffect(() => {
        const fetchUsersInfo = async () => {
            const userIds = comment.map(comment => comment.userId);
            try {
                const userInfoResponses = await Promise.all(
                    userIds.map(userId =>
                        axios.get(`${axiosConfig.baseURL}/api/user/get?userID=${userId}`)
                    )
                );
    
                const avatarPromises = userInfoResponses.map(async (response) => {
                    const user = response.data;
                    try {
                        const avatarResponse = await axios.get(`${axiosConfig.baseURL}/api/user/avatar/${user.userIdStr}`, {
                            responseType: 'arraybuffer'
                        });
                
                        // Only set the custom avatar URL if the request was successful and the content type is an image.
                        if (avatarResponse.status === 200 && avatarResponse.headers['content-type'].includes('image') && avatarResponse.data.byteLength !== 0) {
                            console.log(avatarResponse);
                            return {
                                userId: user.userIdStr,
                                username: user.username || user.email || 'deactivated_user',
                                avatar: URL.createObjectURL(new Blob([avatarResponse.data], { type: avatarResponse.headers['content-type'] }))
                            };
                        } else {
                            throw new Error('Avatar not found or invalid content type'); // Trigger the catch block to use default avatar.
                        }
                    } catch (error) {
                        console.error('Error fetching avatar or avatar not provided:', error);
                        return {
                            userId: user.userIdStr,
                            username: user.username || user.email || 'deactivated_user',
                            avatar: '/images/default-avatar.jpg' // Default avatar used here.
                        };
                    }
                });
                
                const usersAvatars = await Promise.all(avatarPromises);
                const newUsersInfo = usersAvatars.reduce((acc, userInfo) => {
                    acc[userInfo.userId] = {
                        username: userInfo.username,
                        avatar: userInfo.avatar // This will be the default avatar if the fetching failed.
                    };
                    return acc;
                }, {});
                
                setUsersInfo(newUsersInfo);
                
    
                setUsersInfo(newUsersInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
    
        fetchUsersInfo();
    }, [comment]);
    
    const handleEditClick = (commentId, currentText) => {
        setEditingCommentId(commentId);
        setEditedText(currentText);
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedText("");
    };

    const handleSaveEdit = async (commentId) => {
        try {
            await axios.post(`${axiosConfig.baseURL}/api/comment/update`, {
                ratingIdStr: commentId,
                newCommentText: editedText,
            });
            // Update the comment locally or refetch comments list
            handleCancelEdit();
        } catch (error) {
            console.error('Failed to update comment:', error);
        }
    };


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
                            <span className="comment-rating-number">{userComment.overallRating.overall.toFixed(1)}</span>
                        </div>
                        <div className="profile">
                            <img
                                className="profile-picture"
                                src={usersInfo[userComment.userId]?.avatar}
                                alt={`Avatar of ${usersInfo[userComment.userId]?.username}`}
                                style={{ borderRadius: '50%' }}
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
                            <span className="comment-rating-number">{comment.overallRating.overall.toFixed(1)}</span>
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


