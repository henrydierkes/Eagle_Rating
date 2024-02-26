/**
 * Project Name: Eagle_Rating
 * File Name:    RateRepository.java
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

package com.astar.ratingbackend.Repository;

import com.astar.ratingbackend.Entity.Rating;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RateRepository extends MongoRepository<Rating, ObjectId> {
    // Example custom query method
    List<Rating> findByUserId(ObjectId userId);

    // You can add more custom methods here to handle specific queries, e.g., find by tags, date range, etc.
}
