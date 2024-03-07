
/**
 * Project Name: Eagle_Rating
 * File Name:    CommentController.java
 * Package Name: astar\ratingbackend\Comment
 *
 * Type: Comment
 * Purpose: Comment Controller
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * -
 * ...
 */


package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.Comment;
import com.astar.ratingbackend.Service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller for managing comments.
 * Provides endpoints for retrieving comments from the database.
 */
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private ICommentService commentService;

    /**
     * Retrieves all comments stored in the database.
     * @return A list of all comments.
     */
    @GetMapping("/get")
    public List<Comment> getComments(){
        return commentService.getAllComments();
    }
}
