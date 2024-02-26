/**
 * Project Name: Eagle_Rating
 * File Name:    PlaceService.java
 * Package Name: com.astar.ratingbackend.Service
 *
 * Type: Service
 * Purpose: Service class for Place Entity - Facilitates operations such as create, read, update, and delete (CRUD) for places in the system. This service acts as a bridge between the PlaceRepository and the controllers, ensuring that business logic and repository interactions are properly managed. It provides a layer of abstraction to enhance maintenance and decouple the system's components.
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

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Repository.PlaceRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PlaceServiceImpl {
    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceServiceImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    // Method to save a new place
    public Place savePlace(Place place) {
        return placeRepository.save(place);
    }
    public Optional<Place> findById(ObjectId id) {
        return placeRepository.findById(id);
    }

    // Method to retrieve all places
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    // Method to find a place by ID
    public Optional<Place> getPlaceById(ObjectId id) {
        return placeRepository.findById(id);
    }

    // Method to update an existing place
    public Place updatePlace(ObjectId id, Place placeDetails) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + id));
        place.setLocName(placeDetails.getLocName());
        place.setCategory(placeDetails.getCategory());
        place.setLocation(placeDetails.getLocation());
        place.setCampus(placeDetails.getCampus());
        place.setTags(placeDetails.getTags());
        place.setRatingCount(placeDetails.getRatingCount());
        place.setRatings(placeDetails.getRatings());
        place.setImages(placeDetails.getImages());
        return placeRepository.save(place);
    }
    public void deletePlace(ObjectId id) {
        placeRepository.deleteById(id);
    }

    public Place incrementRatingCount(ObjectId id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + id));

        place.setRatingCount(place.getRatingCount() + 1);

        return placeRepository.save(place);
    }
    public Place decrementRatingCount(ObjectId id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + id));

        int currentRatingCount = place.getRatingCount();
        if (currentRatingCount > 0) {
            place.setRatingCount(currentRatingCount - 1);
        }

        return placeRepository.save(place);
    }
//    public ResponseEntity<Place> addRating(ObjectId id, Rating rating) {
//        Place place = placeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Place not found."));
//        Rating.OverallRating overallRating = rating.getOverallRating();
//        validateOverallRating(overallRating);
//        addRatingSpecific(id, overallRating.getRating1(), overallRating.getRating2(), overallRating.getRating3());
//        incrementRatingCount(id);
//        addTags(id, rating.getTags());
//        return ResponseEntity.ok(place);
//    }
    public ResponseEntity<Place> addRating(ObjectId id, Rating rating) {
        // Retrieve place from the database
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Place not found with id: " + id));

        // Update overallRating, rating specific values, and rating count
        updateRatingsAndCount(place, rating);

        // Add tags
        addTags(place, rating.getTags());

        // Save the modified place back to the database
        Place updatedPlace = placeRepository.save(place);

        // Return updated place
        return ResponseEntity.ok(updatedPlace);
    }

    private void validateOverallRating(Rating.OverallRating overallRating) {
        if (overallRating == null || overallRating.getOverall() == null || Double.isNaN(overallRating.getOverall())) {
            throw new IllegalArgumentException("Overall rating cannot be null or NaN");
        }

        if (overallRating.getRating1() == null || Double.isNaN(overallRating.getRating1())) {
            overallRating.setRating1(overallRating.getOverall());
        }

        if (overallRating.getRating2() == null || Double.isNaN(overallRating.getRating2())) {
            overallRating.setRating2(overallRating.getOverall());
        }

        if (overallRating.getRating3() == null || Double.isNaN(overallRating.getRating3())) {
            overallRating.setRating3(overallRating.getOverall());
        }
    }
    public Place addRatingSpecific(ObjectId id, double rating1, double rating2, double rating3) {

        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + id));

        Place.TotalRating totalRatings = place.getTotalRatings();

        totalRatings.setOverall(totalRatings.getOverall() + rating1 + rating2 + rating3);
        totalRatings.setRating1(totalRatings.getRating1() + rating1);
        totalRatings.setRating2(totalRatings.getRating2() + rating2);
        totalRatings.setRating3(totalRatings.getRating3() + rating3);

        place.setTotalRatings(totalRatings);

        return placeRepository.save(place);
    }
    public Place removeRating(ObjectId id, int rating1, int rating2, int rating3) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + id));

        Place.TotalRating totalRatings = place.getTotalRatings();

        totalRatings.setOverall(totalRatings.getOverall() - rating1 - rating2 - rating3);
        totalRatings.setRating1(totalRatings.getRating1() - rating1);
        totalRatings.setRating2(totalRatings.getRating2() - rating2);
        totalRatings.setRating3(totalRatings.getRating3() - rating3);

        place.setTotalRatings(totalRatings);

        return placeRepository.save(place);
    }
    private void addTags(Place place, List<String> tags) {
        // Add the new tags to the existing list of tags
        List<String> existingTags = place.getTags();
        existingTags.addAll(tags);
        place.setTags(existingTags);
    }


    public Map<String, Double> getAverageRatings(ObjectId id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + id));

        Place.TotalRating totalRatings = place.getTotalRatings();
        int ratingCount = place.getRatingCount();
        Map<String, String> ratingNameMap = totalRatings.getRatingName();

        Map<String, Double> averageRatings = new HashMap<>();
        averageRatings.put("overall", totalRatings.getOverall() / ratingCount);

        // Replace rating keys with corresponding specific values
        averageRatings.put(ratingNameMap.getOrDefault("rating1", "rating1"), totalRatings.getRating1() / ratingCount);
        averageRatings.put(ratingNameMap.getOrDefault("rating2", "rating2"), totalRatings.getRating2() / ratingCount);
        averageRatings.put(ratingNameMap.getOrDefault("rating3", "rating3"), totalRatings.getRating3() / ratingCount);

        return averageRatings;
    }
    private void updatePlaceRatings(ObjectId placeId, Rating rating) {
        Place place = findById(placeId)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + placeId));

        Place.TotalRating totalRatings = place.getTotalRatings();

        // Add ratings to the total ratings
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());

        place.setTotalRatings(totalRatings);

        placeRepository.save(place);
    }

    private void updateRatingsAndCount(Place place, Rating rating) {
        // Get the existing totalRatings
        Place.TotalRating totalRatings = place.getTotalRatings();

        // Update overallRating
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());

        // Update rating specific values
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());

        // Update ratingCount
        place.setRatingCount(place.getRatingCount() + 1);

        // Set the updated totalRatings to the place
        place.setTotalRatings(totalRatings);
    }
}
