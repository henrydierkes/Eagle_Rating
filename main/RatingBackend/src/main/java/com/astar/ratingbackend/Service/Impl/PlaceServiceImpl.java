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
import com.astar.ratingbackend.Model.PlaceRepository;
import com.astar.ratingbackend.Service.IPlaceService;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PlaceServiceImpl implements IPlaceService {
    private final PlaceRepository placeRepository;
    @Autowired
    private MongoTemplate mongoTemplate;



    @Autowired
    public PlaceServiceImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;

    }

    // Method to save a new place
    public Place addPlace(Place place) {
        return mongoTemplate.save(place);
    }
    public Optional<Place> findById(ObjectId id) {
        return Optional.ofNullable(mongoTemplate.findById(id, Place.class));
    }

    // Method to retrieve all places
    public List<Place> getAllPlaces() {
        return mongoTemplate.findAll(Place.class);
    }


    public Place updatePlace(ObjectId id, Place placeDetails) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()
                .set("locName", placeDetails.getLocName())
                .set("category", placeDetails.getCategory())
                .set("location", placeDetails.getLocation())
                .set("campus", placeDetails.getCampus())
                .set("tags", placeDetails.getTags())
                .set("ratingCount", placeDetails.getRatingCount())
                .set("ratingIds", placeDetails.getRatingIds())
                .set("images", placeDetails.getImages())
                .set("totalRating", placeDetails.getTotalRating()) // Update totalRating field
                .set("ratingAspect", placeDetails.getRatingAspect()) // Update ratingAspect field
                .set("isDeleted", placeDetails.isDeleted()) // Update isDeleted field
                .set("deletedDate", placeDetails.getDeletedDate()); // Update deletedDate field

        // Update the document in the database
        UpdateResult result = mongoTemplate.updateFirst(query, update, Place.class);

//        if (result.getModifiedCount() == 0) {
//            throw new Exception("Failed to update place with id: " + id);
//        }

        // Retrieve the updated place from the database
        Place updatedPlace = mongoTemplate.findById(id, Place.class);
        return updatedPlace;
    }
    public void removeRating(ObjectId id, Rating rating){
        Double rating1 = rating.getOverallRating().getRating1();
        Double rating2 = rating.getOverallRating().getRating2();
        Double rating3 = rating.getOverallRating().getRating3();
        findById(id).ifPresent(place->{
            Place.TotalRating totalRatings = place.getTotalRating();

            totalRatings.setOverall(totalRatings.getOverall() - rating1 - rating2 - rating3);
            totalRatings.setRating1(totalRatings.getRating1() - rating1);
            totalRatings.setRating2(totalRatings.getRating2() - rating2);
            totalRatings.setRating3(totalRatings.getRating3() - rating3);

            place.setTotalRating(totalRatings);
            updatePlace(id, place);
        });

    }

    //    destructively delete, cannot recover
    public void deletePlaceT(ObjectId id) {
        placeRepository.deleteById(id);
    }

//    fake delete, used usually
    public void deletePlace(ObjectId id) {
        placeRepository.findByIdAndNotDeleted(id).ifPresent(place -> {
            place.setDeleted(true);
            place.setDeletedDate(new Date());
            placeRepository.save(place);
        });
    }


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

        Place.TotalRating totalRatings = place.getTotalRating();

        totalRatings.setOverall(totalRatings.getOverall() + rating1 + rating2 + rating3);
        totalRatings.setRating1(totalRatings.getRating1() + rating1);
        totalRatings.setRating2(totalRatings.getRating2() + rating2);
        totalRatings.setRating3(totalRatings.getRating3() + rating3);

        place.setTotalRating(totalRatings);

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

        Place.TotalRating totalRatings = place.getTotalRating();
        Map<String,String> ratingAspect=place.getRatingAspect();
        int ratingCount = place.getRatingCount();


        Map<String, Double> averageRatings = new LinkedHashMap<>();
        averageRatings.put("overall", totalRatings.getOverall() / ratingCount);
        // Replace rating keys with corresponding specific values
        averageRatings.put(ratingAspect.getOrDefault("rating1", "rating1"), totalRatings.getRating1() / ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating2", "rating2"), totalRatings.getRating2() / ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating3", "rating3"), totalRatings.getRating3() / ratingCount);

        return averageRatings;
    }
    private void updatePlaceRatings(ObjectId placeId, Rating rating) {
        Place place = findById(placeId)
                .orElseThrow(() -> new RuntimeException("Place not found with id: " + placeId));

        Place.TotalRating totalRatings = place.getTotalRating();

        // Add ratings to the total ratings
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());

        place.setTotalRating(totalRatings);

        placeRepository.save(place);
    }

    private void updateRatingsAndCount(Place place, Rating rating) {
        // Get the existing totalRatings
        Place.TotalRating totalRatings = place.getTotalRating();

        // Update overallRating
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());

        // Update rating specific values
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());

        // Update ratingCount
        place.setRatingCount(place.getRatingCount() + 1);

        // Set the updated totalRatings to the place
        place.setTotalRating(totalRatings);
    }



}
