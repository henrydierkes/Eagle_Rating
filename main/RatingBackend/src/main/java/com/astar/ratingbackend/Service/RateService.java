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

package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Rate;
import com.astar.ratingbackend.Repository.RateRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RateService {
    private final RateRepository rateRepository;

    @Autowired
    public RateService(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

    // Save a new rate
    public Rate saveRate(Rate rate) {
        return rateRepository.save(rate);
    }

    // Retrieve all rates
    public List<Rate> getAllRates() {
        return rateRepository.findAll();
    }

    // Find a rate by ID
    public Optional<Rate> getRateById(ObjectId id) {
        return rateRepository.findById(id);
    }

    // Update an existing rate
    public Rate updateRate(ObjectId id, Rate rateDetails) {
        Rate existingRate = rateRepository.findById(id)
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
