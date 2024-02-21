
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

import com.astar.ratingbackend.Entity.Comment; // Assuming you have a Comment entity
import com.astar.ratingbackend.Service.CommentService; // Assuming there's a CommentService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/comment") // Changed from /api/user to /api/comment
public class CommentController {
    @Autowired
    private CommentService commentService; // Changed from UserService to CommentService

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/get")
    public List<Comment> getComments(){ // Method and return type changed to reflect comments
        return commentService.getAllComments(); // Assuming a method getAllComments() in CommentService
    }
}
