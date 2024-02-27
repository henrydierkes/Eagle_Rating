package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Model.PlaceRepository;
import com.astar.ratingbackend.Service.IPlaceService;
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

    public Place addPlace(Place place) {
        return (Place)this.mongoTemplate.save(place);
    }

    public Optional<Place> findById(ObjectId id) {
        return Optional.ofNullable((Place)this.mongoTemplate.findById(id, Place.class));
    }

    @Override
    public List<Place> searchPlacesByName(String name) {
        return null;
    }

    @Override
    public List<Place> searchPlacesByNameAndCategory(String name, String category) {
        return null;
    }

    public List<Place> getAllPlaces() {
        return this.mongoTemplate.findAll(Place.class);
    }

    public Place updatePlace(ObjectId id, Place placeDetails) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = (new Update()).set("locName", placeDetails.getLocName()).set("category", placeDetails.getCategory()).set("location", placeDetails.getLocation()).set("campus", placeDetails.getCampus()).set("tags", placeDetails.getTags()).set("ratingCount", placeDetails.getRatingCount()).set("ratingIds", placeDetails.getRatingIds()).set("images", placeDetails.getImages()).set("totalRating", placeDetails.getTotalRating()).set("ratingAspect", placeDetails.getRatingAspect()).set("isDeleted", placeDetails.isDeleted()).set("deletedDate", placeDetails.getDeletedDate());
        this.mongoTemplate.updateFirst(query, update, Place.class);
        Place updatedPlace = (Place)this.mongoTemplate.findById(id, Place.class);
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
        Place place = (Place)this.placeRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("Place not found with id: " + id);
        });
        this.updateRatingsAndCount(place, rating);
        this.addTags(place, rating.getTags());
        Place updatedPlace = (Place)this.placeRepository.save(place);
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
        Place place = (Place)this.placeRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + id);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating1 + rating2 + rating3);
        totalRatings.setRating1(totalRatings.getRating1() + rating1);
        totalRatings.setRating2(totalRatings.getRating2() + rating2);
        totalRatings.setRating3(totalRatings.getRating3() + rating3);
        place.setTotalRating(totalRatings);
        return (Place)this.placeRepository.save(place);
    }

    private void addTags(Place place, List<String> tags) {
        List<String> existingTags = place.getTags();
        existingTags.addAll(tags);
        place.setTags(existingTags);
    }

    public Map<String, Double> getAverageRatings(ObjectId id) {
        Place place = (Place)this.placeRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + id);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        Map<String, String> ratingAspect = place.getRatingAspect();
        int ratingCount = place.getRatingCount();
        Map<String, Double> averageRatings = new LinkedHashMap();
        averageRatings.put("overall", totalRatings.getOverall() / (double)ratingCount);
        averageRatings.put((String)ratingAspect.getOrDefault("rating1", "rating1"), totalRatings.getRating1() / (double)ratingCount);
        averageRatings.put((String)ratingAspect.getOrDefault("rating2", "rating2"), totalRatings.getRating2() / (double)ratingCount);
        averageRatings.put((String)ratingAspect.getOrDefault("rating3", "rating3"), totalRatings.getRating3() / (double)ratingCount);
        return averageRatings;
    }

    private void updatePlaceRatings(ObjectId placeId, Rating rating) {
        Place place = (Place)this.findById(placeId).orElseThrow(() -> {
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

    private void updateRatingsAndCount(Place place, Rating rating) {
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());
        place.setRatingCount(place.getRatingCount() + 1);
        place.setTotalRating(totalRatings);
    }
}

