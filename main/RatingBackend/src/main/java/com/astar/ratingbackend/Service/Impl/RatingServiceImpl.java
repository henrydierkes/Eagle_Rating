/**
 * Project Name: Eagle_Rating
 * File Name:    RateService.java
 * Package Name: com.astar.ratingbackend.Service
 *
 * Type: Service
 * Purpose: Service class for Rate Entity - Facilitates operations such as create, read, update, and delete (CRUD) for ratings in the system. This service acts as a bridge between the RateRepository and the controllers, ensuring that business logic and repository interactions are properly managed. It aims to provide a layer of abstraction to enhance maintenance and decouple the system's components.
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

import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Repository.RateRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl {
    private final RateRepository rateRepository;



    @Autowired
    public RatingServiceImpl(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

    // Save a new rate
    public Rating saveRate(Rating rating) {
        if(rating.getRatingId()==null){

        }
        if (rating.getTags() == null) {
            rating.setTags(Collections.emptyList()); // Empty list as default value
        }
        if (rating.getComment() == null) {
            rating.setComment(""); // Empty string as default value
        }if (rating.getDate() == null) {
            rating.setDate(new Date()); // Current date as default value
        }
        if (rating.getLikes() == null) {
            rating.setLikes(0); // 0 as default value
        }
        if (rating.getDislikes() == null) {
            rating.setDislikes(0); // 0 as default value
        }
        if (rating.getComments() == null) {
            rating.setComments(Collections.emptyList()); // Empty list as default value
        }

        return rateRepository.save(rating);
    }


    // Retrieve all rates
    public List<Rating> getAllRatings() {
        return rateRepository.findAll();
    }

    // Find a rate by ID
    public Optional<Rating> getRateById(ObjectId id) {
        return rateRepository.findById(id);
    }

    // Update an existing rate
    public Rating updateRate(ObjectId id, Rating rateDetails) {
        Rating existingRate = rateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rate not found with id: " + id));
        existingRate.setUserId(rateDetails.getUserId());
        existingRate.setTags(rateDetails.getTags());
        existingRate.setComment(rateDetails.getComment());
        existingRate.setDate(rateDetails.getDate());
        existingRate.setLikes(rateDetails.getLikes());
        existingRate.setDislikes(rateDetails.getDislikes());
        existingRate.setComments(rateDetails.getComments());
        // Additional fields to be updated if needed
        return rateRepository.save(existingRate);
    }


    // Delete a rate by its ID
    public void deleteRate(ObjectId id) {
        rateRepository.deleteById(id);
    }
}
