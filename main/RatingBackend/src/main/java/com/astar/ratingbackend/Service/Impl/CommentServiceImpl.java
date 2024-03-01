/**
 * Project Name: Eagle_Rating
 * File Name:    CommentService.java
 * Package Name: com.astar.ratingbackend.Service
 *
 * Type: Service
 * Purpose: Service class for Comment Entity - Facilitates operations such as create, read, update, and delete (CRUD) for comments in the system. This service acts as a bridge between the CommentRepository and the controllers, ensuring that business logic and repository interactions are properly managed. It provides a layer of abstraction to enhance maintenance and decouple the system's components.
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * - [Additional dates] [Modifications] [Modifier]
 * ...
 */

package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.Comment;
import com.astar.ratingbackend.Model.CommentRepository;
import com.astar.ratingbackend.Service.ICommentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements ICommentService {
    private final CommentRepository commentRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Save a new comment
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // Retrieve all comments
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    // Find a comment by ID
    public Optional<Comment> getCommentById(ObjectId id) {
        return commentRepository.findById(id);
    }

    // Update an existing comment
    public Comment updateComment(ObjectId id, Comment commentDetails) {
        Comment existingComment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
        existingComment.setText(commentDetails.getText());
        existingComment.setDeleted(commentDetails.isDeleted());
        existingComment.setDeletedDate(commentDetails.getDeletedDate());
        existingComment.setDate(commentDetails.getDate());
        // Additional fields to be updated if needed
        return commentRepository.save(existingComment);
    }

    // Delete a comment by its ID
    public void deleteComment(ObjectId id) {
        commentRepository.deleteById(id);
    }
    public void deleteCommentT(ObjectId id) {
        commentRepository.findByIdAndNotDeleted(id).ifPresent(comment -> {
            comment.setDeleted(true);
            comment.setDeletedDate(new Date());
            commentRepository.save(comment);
        });
    }
}
