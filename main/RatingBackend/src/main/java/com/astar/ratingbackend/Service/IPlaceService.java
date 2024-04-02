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
    public ResponseEntity<Place> addRating(String id, Rating rating);
    public Map<String, Double> getAverageRatingsMap(ObjectId id);
    public boolean deleteRating(Rating rating);
    Optional<Place> findById(ObjectId id);
    Place validatePlace(String placeId);
    List<Place> searchPlacesByName(String name);
    List<Place> searchPlacesByNameAndCategory(String name, String category);
    List<Place> searchByTagsAndCategory(List<String> tags, String category);

    List<Place> searchByLocNameAndCategoryAndTagsAll(String locName, String category, List<String> tags);
    void sortRatingsDescending(List<Place> places);
    public List<Place> findTopPlaces();
    public List<Place> findTopPlaces(int limit);
}
