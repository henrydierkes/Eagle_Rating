package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IPlaceService {
    public Place addPlace(Place place);
    public List<Place> getAllPlaces();
    public Place updatePlace(ObjectId id, Place placeDetails);
    public void deletePlace(ObjectId id);
    public void deletePlaceT(ObjectId id);
    public ResponseEntity<Place> addRating(ObjectId id, Rating rating);
    public Map<String, Double> getAverageRatingsMap(ObjectId id);
    public void removeRating(ObjectId id, Rating rating);

    Optional<Place> findById(ObjectId id);
    List<Place> searchPlacesByName(String name);
    List<Place> searchPlacesByNameAndCategory(String name, String category);
    List<Place> searchByTags(List<String> tags);

    List<Place> searchByLocNameAndCategoryAndTagsAll(String locName, String category, List<String> tags);
}
