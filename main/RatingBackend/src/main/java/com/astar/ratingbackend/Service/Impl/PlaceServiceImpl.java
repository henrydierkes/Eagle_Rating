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
import com.astar.ratingbackend.Repository.PlaceRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    // Method to delete a place by ID
    public void deletePlace(ObjectId id) {
        placeRepository.deleteById(id);
    }
}
