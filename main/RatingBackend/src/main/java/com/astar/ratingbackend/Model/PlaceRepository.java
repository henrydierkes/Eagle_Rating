/**
 * Project Name: Eagle_Rating
 * File Name:    PlaceRepository.java
 * Package Name: com.astar.ratingbackend.Repository
 *
 * Type: Repository
 * Purpose: Repository interface for Place Entity - Facilitates operations such as create, read, update, and delete (CRUD) for places in the system.
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

import com.astar.ratingbackend.Entity.Place;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends MongoRepository<Place, ObjectId> {
    // Example custom query method
    List<Place> findByCategory(String category);

    Optional<Place> findById(ObjectId id);

    // Additional custom methods to facilitate specific queries, for example:
    // - Find places by tags
    // - Find places within a certain location
    // - Find places on a specific campus
}
