/**
 * Project Name: Eagle_Rating
 * File Name:    RatingRepository.java
 * Package Name: com.astar.ratingbackend.Repository
 *
 * Type: Repository
 * Purpose: Repository interface for Rate Entity - Facilitates operations such as create, read, update, and delete (CRUD) for ratings in the system.
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * - [Date] [Modification] [Modifier]
 * ...
 */

package com.astar.ratingbackend.Model;

import com.astar.ratingbackend.Entity.Rating;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends MongoRepository<Rating, ObjectId> {
    // Example custom query method
    List<Rating> findByUserId(ObjectId userId);
    @Query("{ '_id' : ?0, 'isDeleted' : false }")
    Optional<Rating> findByIdAndNotDeleted(ObjectId id);

    // You can add more custom methods here to handle specific queries, e.g., find by tags, date range, etc.
}
