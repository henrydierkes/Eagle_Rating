package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Comment;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface ICommentService {
    public Comment addComment(Comment comment);
    public List<Comment> getAllComments();
    public Optional<Comment> getCommentById(ObjectId id);
    public Comment updateComment(ObjectId id, Comment commentDetails);
//    public void deleteComment(ObjectId id);
//    public void deleteCommentT(ObjectId id);
}
