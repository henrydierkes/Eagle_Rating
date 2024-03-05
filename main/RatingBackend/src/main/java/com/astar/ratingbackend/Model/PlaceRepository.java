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

package com.astar.ratingbackend.Model;

import com.astar.ratingbackend.Entity.Place;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing Place entities in MongoDB.
 * Supports standard CRUD operations and custom queries for Place entities.
 */
@Repository
public interface PlaceRepository extends MongoRepository<Place, ObjectId> {

    /**
     * Finds places by their category.
     * @param category The category to filter places.
     * @return A list of places that belong to the specified category.
     */
    List<Place> findByCategory(String category);

    /**
     * Finds a place by its ID ensuring it is not marked as deleted.
     * @param id The ID of the place to find.
     * @return An Optional containing the place if found, and it's not deleted.
     */
    @Query("{ '_id' : ?0, 'isDeleted' : false }")
    Optional<Place> findByIdAndNotDeleted(ObjectId id);

    /**
     * Finds a place by its ID.
     * @param id The ID of the place to find.
     * @return An Optional containing the place if found.
     */
    Optional<Place> findById(ObjectId id);

    /**
     * Finds places whose names contain the given string, case-insensitive.
     * @param locName The string to match in place names.
     * @return A list of places with names containing the given string.
     */
    List<Place> findByLocNameContainingIgnoreCase(String locName);

    /**
     * Finds places with names containing the given string (case insensitive) and belonging to a specific category.
     * @param locName The name string to match.
     * @param category The category of the places.
     * @return A list of places that match both criteria.
     */
    List<Place> findByLocNameContainingIgnoreCaseAndCategory(String locName, String category);

    /**
     * Finds places that contain all specified tags.
     * @param tags The list of tags each place must contain.
     * @return A list of places containing all specified tags.
     */
    @Query("{ 'tags': { $all: ?0 } }")
    List<Place> findByTagsContainingAll(List<String> tags);

    /**
     * Finds places by location name, category, and containing all specified tags, with all parameters supporting regex for flexible matching.
     * @param locName The location name pattern to match (regex supported).
     * @param category The category pattern to match (regex supported).
     * @param tags The list of tags each place must contain.
     * @return A list of places matching the location name, category, and tags criteria.
     */
    @Query("{ 'locName': {$regex: ?0, $options: 'i'}, 'category': {$regex: ?1, $options: 'i'}, 'tags': {$all: ?2} }")
    List<Place> findByLocNameAndCategoryAndTagsAll(String locName, String category, List<String> tags);
}
