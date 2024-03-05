package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Model.PlaceRepository;
import com.astar.ratingbackend.Service.IPlaceService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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
    /**
     * Adds a new place to the database, setting default values for unspecified fields.
     * @param place The Place entity to be added.
     * @return The saved Place entity.
     */
    public Place addPlace(Place place) {
        if(place.getCampus()==null){
            place.setCampus("Emory-Main");
        }
        place.setDeleted(false);
        place.setDeletedDate(null);
        return this.mongoTemplate.save(place);
    }
    /**
     * Retrieves a place by its ID.
     * @param id The ObjectId of the place to retrieve.
     * @return An Optional containing the found Place or empty if not found.
     */
    public Optional<Place> findById(ObjectId id) {
        return Optional.ofNullable(this.mongoTemplate.findById(id, Place.class));
    }
    /**
     * Searches for places by name, ignoring case sensitivity.
     * @param name The name to search for in place entities.
     * @return A list of places matching the search criteria.
     */
    @Override
    public List<Place> searchPlacesByName(String name) {
        return placeRepository.findByLocNameContainingIgnoreCase(name);
    }
    /**
     * Searches for places by name and category, ignoring case sensitivity.
     * @param name The name to search for.
     * @param category The category to filter by.
     * @return A list of places matching the search criteria.
     */
    @Override
    public List<Place> searchPlacesByNameAndCategory(String name, String category) {
        return placeRepository.findByLocNameContainingIgnoreCaseAndCategory(name, category);
    }
    /**
     * Retrieves all places from the database.
     * @return A list of all places.
     */
    public List<Place> getAllPlaces() {
        return this.mongoTemplate.findAll(Place.class);
    }

    /**
     * Updates the details of an existing place.
     * @param id The ObjectId of the place to update.
     * @param placeDetails The updated details of the place.
     * @return The updated Place entity, or null if the place was not found.
     */
    public Place updatePlace(ObjectId id, Place placeDetails) {
        Place existingPlace = placeRepository.findById(id).orElse(null);
        if (existingPlace == null) {
            // Handle case when place is not found
            return null;
        }

        // Update all fields from placeDetails
        existingPlace.setLocName(placeDetails.getLocName());
        existingPlace.setCategory(placeDetails.getCategory());
        existingPlace.setLocation(placeDetails.getLocation());
        existingPlace.setCampus(placeDetails.getCampus());
        existingPlace.setTags(placeDetails.getTags());
        existingPlace.setRatingCount(placeDetails.getRatingCount());
        existingPlace.setRatingIds(placeDetails.getRatingIds());
        existingPlace.setImages(placeDetails.getImages());
        existingPlace.setTotalRating(placeDetails.getTotalRating());
        existingPlace.setRatingAspect(placeDetails.getRatingAspect());
        existingPlace.setDeletedDate(placeDetails.getDeletedDate());
        existingPlace.setDeleted(placeDetails.isDeleted());

        // Save the updated place using the repository
        Place updatedPlace = placeRepository.save(existingPlace);
        return updatedPlace;
    }
    /**
     * Removes a rating from a place and updates the total ratings accordingly.
     * @param id The ObjectId of the place from which to remove the rating.
     * @param rating The Rating to be removed.
     */
    public void removeRating(ObjectId id, Rating rating) {
        Double rating1 = rating.getOverallRating().getRating1();
        Double rating2 = rating.getOverallRating().getRating2();
        Double rating3 = rating.getOverallRating().getRating3();
        this.findById(id).ifPresent((place) -> {
            Place.TotalRating totalRatings = place.getTotalRating();
            totalRatings.setOverall(totalRatings.getOverall() - rating1 - rating2 - rating3);
            totalRatings.setRating1(totalRatings.getRating1() - rating1);
            totalRatings.setRating2(totalRatings.getRating2() - rating2);
            totalRatings.setRating3(totalRatings.getRating3() - rating3);
            place.setTotalRating(totalRatings);
            this.updatePlace(id, place);
        });
    }
    /**
     * Deletes a place from the database by its ID.
     * @param id The ObjectId of the place to delete.
     */
    public void deletePlaceT(ObjectId id) {
        this.placeRepository.deleteById(id);
    }
    /**
     * Marks a place as deleted without actually removing it from the database.
     * @param id The ObjectId of the place to mark as deleted.
     */
    public void deletePlace(ObjectId id) {
        this.placeRepository.findByIdAndNotDeleted(id).ifPresent((place) -> {
            place.setDeleted(true);
            place.setDeletedDate(new Date());
            this.placeRepository.save(place);
        });
    }
    /**
     * Adds a rating to a specific place and updates its overall ratings.
     * @param id The ObjectId of the place to rate.
     * @param rating The Rating to add.
     * @return A ResponseEntity containing the updated Place or an error message.
     */
    public ResponseEntity<Place> addRating(ObjectId id, Rating rating) {
        Place place = this.placeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("Place not found with id: " + id);
        });
        this.updateRatingsAndCount(place, rating);
        this.addTags(place, rating.getTags());
        Place updatedPlace = this.placeRepository.save(place);
        return ResponseEntity.ok(updatedPlace);
    }
    /**
     * Validates the overall rating object, ensuring that no part of it is null or NaN. If any specific rating
     * component (rating1, rating2, rating3) is null or NaN, it is set to the value of the overall rating.
     * @param overallRating The overall rating object to validate.
     * @throws IllegalArgumentException if the overall rating is null or NaN.
     */
    private void validateOverallRating(Rating.OverallRating overallRating) {
        if (overallRating != null && overallRating.getOverall() != null && !Double.isNaN(overallRating.getOverall())) {
            if (overallRating.getRating1() == null || Double.isNaN(overallRating.getRating1())) {
                overallRating.setRating1(overallRating.getOverall());
            }

            if (overallRating.getRating2() == null || Double.isNaN(overallRating.getRating2())) {
                overallRating.setRating2(overallRating.getOverall());
            }

            if (overallRating.getRating3() == null || Double.isNaN(overallRating.getRating3())) {
                overallRating.setRating3(overallRating.getOverall());
            }

        } else {
            throw new IllegalArgumentException("Overall rating cannot be null or NaN");
        }
    }
    /**
     * Adds specific rating values to a place and updates its total rating accordingly.
     * @param id The ObjectId of the place to add the rating to.
     * @param rating1 The first rating value to add.
     * @param rating2 The second rating value to add.
     * @param rating3 The third rating value to add.
     * @return The updated Place entity with the new ratings added.
     * @throws RuntimeException if the place is not found by the provided id.
     */
    public Place addRatingSpecific(ObjectId id, double rating1, double rating2, double rating3) {
        Place place = this.placeRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + id);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating1 + rating2 + rating3);
        totalRatings.setRating1(totalRatings.getRating1() + rating1);
        totalRatings.setRating2(totalRatings.getRating2() + rating2);
        totalRatings.setRating3(totalRatings.getRating3() + rating3);
        place.setTotalRating(totalRatings);
        return this.placeRepository.save(place);
    }
    /**
     * Adds a list of tags to a place. If the place already contains tags, the new tags are appended to the existing list.
     * @param place The Place entity to which the tags are added.
     * @param tags The list of tags to add to the place.
     */
    private void addTags(Place place, List<String> tags) {
        List<String> existingTags = place.getTags();
        existingTags.addAll(tags);
        place.setTags(existingTags);
    }
    /**
     * Calculates and returns the average ratings for a place by dividing the total ratings by the number of ratings.
     * @param id The ObjectId of the place for which to calculate the average ratings.
     * @return A map containing the average ratings for each rating aspect.
     * @throws RuntimeException if the place is not found by the provided id.
     */
    public Map<String, Double> getAverageRatings(ObjectId id) {
        Place place = this.placeRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + id);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        Map<String, String> ratingAspect = place.getRatingAspect();
        int ratingCount = place.getRatingCount();
        Map<String, Double> averageRatings = new LinkedHashMap();
        averageRatings.put("overall", totalRatings.getOverall() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating1", "rating1"), totalRatings.getRating1() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating2", "rating2"), totalRatings.getRating2() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating3", "rating3"), totalRatings.getRating3() / (double)ratingCount);
        return averageRatings;
    }
    /**
     * Updates the place ratings with a new Rating entity's values and increments the rating count.
     * @param placeId The ObjectId of the place to update the ratings for.
     * @param rating The new Rating entity containing the ratings to add.
     * @throws RuntimeException if the place is not found by the provided id.
     */
    private void updatePlaceRatings(ObjectId placeId, Rating rating) {
        Place place = this.findById(placeId).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + placeId);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());
        place.setTotalRating(totalRatings);
        this.placeRepository.save(place);
    }
    /**
     * Updates the total ratings and rating count of a place with the values from a new Rating entity.
     * @param place The Place entity to update.
     * @param rating The Rating entity containing the new ratings to add.
     */
    private void updateRatingsAndCount(Place place, Rating rating) {
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());
        place.setRatingCount(place.getRatingCount() + 1);
        place.setTotalRating(totalRatings);
    }
    /**
     * Searches for places containing all specified tags.
     * @param tags The list of tags to search for.
     * @return A list of places containing all the specified tags.
     */
    public List<Place> searchByTags(List<String> tags) {
        return placeRepository.findByTagsContainingAll(tags);
    }

    /**
     * Searches for places by location name, category, and containing all specified tags, using case-insensitive matching.
     * @param locName The location name to search for.
     * @param category The category of places to search for.
     * @param tags The list of tags each place must contain.
     * @return A list of places matching all specified criteria.
     */
    public List<Place> searchByLocNameAndCategoryAndTagsAll(String locName, String category, List<String> tags) {
        return placeRepository.findByLocNameAndCategoryAndTagsAll(locName, category, tags);
    }
}

