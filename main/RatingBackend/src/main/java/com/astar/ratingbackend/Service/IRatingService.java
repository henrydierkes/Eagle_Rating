package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Rating;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface IRatingService {
    public Rating addRating(Rating rating) ;
    public List<Rating> getAllRatings();
    public List<Rating> getAllRatingsDesc();
    public Optional<Rating> getRateById(ObjectId id);
    public Rating updateRate(ObjectId id, Rating rateDetails);
    public void deleteRating(ObjectId id);
    public void deleteRatingT(ObjectId id);
    public List<Rating> getRatingByFilter(Rating.OverallRating rating, int floor);
    public List<Rating> getRatingByFilterDesc(Rating.OverallRating rating, int floor);
}
