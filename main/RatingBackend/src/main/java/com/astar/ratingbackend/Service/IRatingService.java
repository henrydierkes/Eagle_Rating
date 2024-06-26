package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Entity.User;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IRatingService {
    public Rating addLike(String userID, String ratingId, boolean like);
    public String addRating(Rating rating);
    public void uploadImage(String ratingId, MultipartFile[] images);
    public Rating validateNewRating(Rating rating);
    public Rating addRatingDb(Rating rating, User user) ;
    public Rating validateRating(String ratingId);
    public List<Rating> getAllRatings();
    public List<Rating> getAllRatingsDesc();
    public Optional<Rating> getRateById(ObjectId id);
    public Rating updateRate(ObjectId id, Rating rateDetails);
    public boolean deleteRatingDb(String id);
    public ResponseEntity<String> cleanRatings(List<String> ids, boolean trueDelete);
    public void deleteRatingDbT(ObjectId id);
    public ResponseEntity<String> deleteRating(String id, Boolean trueDelete);
    public List<Rating> getRatingByFilter(Rating.OverallRating rating, int floor);
    public List<Rating> getRatingByFilterDesc(Rating.OverallRating rating, int floor);

    public int isLike(String userId, String ratingId);
    Optional<Rating> findUserRatingForPlace(String userId, String placeId);
}
