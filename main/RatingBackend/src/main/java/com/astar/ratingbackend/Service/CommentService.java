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

package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Comment;
import com.astar.ratingbackend.Repository.CommentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Save a new comment
    public Comment saveComment(Comment comment) {
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
        existingComment.setDate(commentDetails.getDate());
        // Additional fields to be updated if needed
        return commentRepository.save(existingComment);
    }

    // Delete a comment by its ID
    public void deleteComment(ObjectId id) {
        commentRepository.deleteById(id);
    }
}
