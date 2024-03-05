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

/**
 * Repository interface for managing Rating entities in MongoDB.
 * Supports standard CRUD operations and custom queries for Rating entities.
 */
@Repository
public interface RatingRepository extends MongoRepository<Rating, ObjectId> {

    /**
     * Finds ratings made by a specific user, identified by their user ID.
     * @param userId The ObjectId of the user whose ratings are sought.
     * @return A list of ratings made by the specified user.
     */
    List<Rating> findByUserId(ObjectId userId);

    /**
     * Finds a rating by its ID ensuring it is not marked as deleted.
     * @param id The ID of the rating to find.
     * @return An Optional containing the rating if found, and it's not deleted.
     */
    @Query("{ '_id' : ?0, 'isDeleted' : false }")
    Optional<Rating> findByIdAndNotDeleted(ObjectId id);

    /**
     * Finds ratings with an overall score greater than a specified value.
     * @param overallRating The threshold value for the overall rating.
     * @return A list of ratings with overall scores exceeding the specified threshold.
     */
    List<Rating> findByOverallRatingOverallGreaterThan(Double overallRating);

    /**
     * Finds ratings with a rating1 score greater than a specified value.
     * @param rating1 The threshold value for rating1.
     * @return A list of ratings with rating1 scores exceeding the specified threshold.
     */
    List<Rating> findByOverallRatingRating1GreaterThan(Double rating1);

    /**
     * Finds ratings with a rating2 score greater than a specified value.
     * @param rating2 The threshold value for rating2.
     * @return A list of ratings with rating2 scores exceeding the specified threshold.
     */
    List<Rating> findByOverallRatingRating2GreaterThan(Double rating2);

    /**
     * Finds ratings with a rating3 score greater than a specified value.
     * @param rating3 The threshold value for rating3.
     * @return A list of ratings with rating3 scores exceeding the specified threshold.
     */
    List<Rating> findByOverallRatingRating3GreaterThan(Double rating3);

    /**
     * Finds ratings made on a specific floor of a building.
     * @param floor The floor number to filter ratings.
     * @return A list of ratings made on the specified floor.
     */
    List<Rating> findByFloor(int floor);

    // Additional custom methods can be defined here to handle specific queries, such as finding by tags, within a date range, etc.
}
