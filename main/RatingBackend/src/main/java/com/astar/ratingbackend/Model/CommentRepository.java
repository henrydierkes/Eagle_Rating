/**
 * Project Name: Eagle_Rating
 * File Name:    CommentRepository.java
 * Package Name: com.astar.ratingbackend.Repository
 *
 * Type: Repository
 * Purpose: Repository interface for Comment Entity - Facilitates operations such as create, read, update, and delete (CRUD) for comments in the system.
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * ...
 */

package com.astar.ratingbackend.Repository;

import com.astar.ratingbackend.Entity.Comment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, ObjectId> {
    // Example custom query method
    List<Comment> findByUserId(ObjectId userId);

    // Additional custom methods could be added to facilitate specific queries, for example:
    // - Find comments by date range
    // - Find comments related to a specific rating
}
