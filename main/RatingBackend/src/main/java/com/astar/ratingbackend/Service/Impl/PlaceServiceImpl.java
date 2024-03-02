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

    public Place addPlace(Place place) {
        if(place.getCampus()==null){
            place.setCampus("Emory-Main");
        }
        place.setDeleted(false);
        place.setDeletedDate(null);
        return this.mongoTemplate.save(place);
    }

    public Optional<Place> findById(ObjectId id) {
        return Optional.ofNullable(this.mongoTemplate.findById(id, Place.class));
    }

    @Override
    public List<Place> searchPlacesByName(String name) {
        return placeRepository.findByLocNameContainingIgnoreCase(name);
    }

    @Override
    public List<Place> searchPlacesByNameAndCategory(String name, String category) {
        return placeRepository.findByLocNameContainingIgnoreCaseAndCategory(name, category);
    }

    public List<Place> getAllPlaces() {
        return this.mongoTemplate.findAll(Place.class);
    }

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

    public void deletePlaceT(ObjectId id) {
        this.placeRepository.deleteById(id);
    }

    public void deletePlace(ObjectId id) {
        this.placeRepository.findByIdAndNotDeleted(id).ifPresent((place) -> {
            place.setDeleted(true);
            place.setDeletedDate(new Date());
            this.placeRepository.save(place);
        });
    }

    public ResponseEntity<Place> addRating(ObjectId id, Rating rating) {
        Place place = this.placeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("Place not found with id: " + id);
        });
        this.updateRatingsAndCount(place, rating);
        this.addTags(place, rating.getTags());
        Place updatedPlace = this.placeRepository.save(place);
        return ResponseEntity.ok(updatedPlace);
    }

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
        int ratingCount = place.getRatingCount();
        Place.AverageRating averageRating=place.getAverageRating();
        averageRating.setRating1(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setRating2(totalRatings.getRating2() / (double)ratingCount);
        averageRating.setRating3(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setOverall(totalRatings.getOverall() / (double)ratingCount);
        place.setAverageRating(averageRating);
        return this.placeRepository.save(place);
    }

    private void addTags(Place place, List<String> tags) {
        List<String> existingTags = place.getTags();
        existingTags.addAll(tags);
        place.setTags(existingTags);
    }
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

    public Map<String, Double> getAverageRatingsMap(ObjectId id) {
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
        int ratingCount = place.getRatingCount();
        Place.AverageRating averageRating=place.getAverageRating();
        averageRating.setRating1(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setRating2(totalRatings.getRating2() / (double)ratingCount);
        averageRating.setRating3(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setOverall(totalRatings.getOverall() / (double)ratingCount);
        place.setAverageRating(averageRating);
        this.placeRepository.save(place);
    }

    private void updateRatingsAndCount(Place place, Rating rating) {
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());
        place.setRatingCount(place.getRatingCount() + 1);
        place.setTotalRating(totalRatings);
        int ratingCount = place.getRatingCount();
        Place.AverageRating averageRating=place.getAverageRating();
        averageRating.setRating1(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setRating2(totalRatings.getRating2() / (double)ratingCount);
        averageRating.setRating3(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setOverall(totalRatings.getOverall() / (double)ratingCount);
        place.setAverageRating(averageRating);
        this.placeRepository.save(place);
    }
    public List<Place> searchByTags(List<String> tags) {
        return placeRepository.findByTagsContainingAll(tags);
    }
}

