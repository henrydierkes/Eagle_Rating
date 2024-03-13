package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Entity.User;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface IRatingService {
    public Rating addRating(Rating rating, User user) ;
    public Rating validateRating(String ratingId);
    public List<Rating> getAllRatings();
    public List<Rating> getAllRatingsDesc();
    public Optional<Rating> getRateById(ObjectId id);
    public Rating updateRate(ObjectId id, Rating rateDetails);
    public boolean deleteRating(String id);
    public void deleteRatingT(ObjectId id);
    public List<Rating> getRatingByFilter(Rating.OverallRating rating, int floor);
    public List<Rating> getRatingByFilterDesc(Rating.OverallRating rating, int floor);
}
