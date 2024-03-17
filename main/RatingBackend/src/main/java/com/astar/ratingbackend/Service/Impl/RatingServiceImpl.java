/**
 * Project Name: Eagle_Rating
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

package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.RatingRepository;
import com.astar.ratingbackend.Service.IPlaceService;
import com.astar.ratingbackend.Service.IRatingService;
import com.astar.ratingbackend.Service.IUserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class RatingServiceImpl implements IRatingService {
    private final com.astar.ratingbackend.Model.RatingRepository ratingRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private IPlaceService placeService;
    @Autowired
    private IUserService userService;


    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public Rating validateRating(String ratingId) {
        // Check if the rating exists
        Optional<Rating> optionalRating = ratingRepository.findById(new ObjectId(ratingId));
        if (optionalRating.isPresent()) {
            return optionalRating.get();
        } else {
            throw new IllegalArgumentException("Rating with ID " + ratingId + " does not exist.");
        }
    }
    @Override
    @Transactional
    public Rating validateNewRating(Rating rating){
        String userId=rating.getUserId();
        String placeId=rating.getPlaceId();
        // Retrieve user's ratings
        String[] ratingIds = userService.findUserById(new ObjectId(userId)).getRatings();
        if(ratingIds==null) return rating;
        // Filter out deleted ratings and collect the remaining ones
        List<String> validRatingIds = new ArrayList<>();
        for (String ratingId : ratingIds) {
            Optional<Rating> existingRating = getRateById(new ObjectId(ratingId));
            if (!existingRating.isPresent() || !existingRating.get().isDeleted()) {
                validRatingIds.add(ratingId);
            }
        }
        for (String ratingId : validRatingIds) {
            Optional<Rating> existingRating = getRateById(new ObjectId(ratingId));
            if (existingRating.isPresent() && existingRating.get().getPlaceId().equals(placeId)) {
                throw new IllegalArgumentException("User has already rated this place.");
            }
        }
        return rating;
    }
    /**
     * Saves a new rating to the repository, and updates user and place
     * @param rating The rating entity to be saved.
     * @return The saved rating entity.
     */

    @Transactional
    public ResponseEntity<String> addRating(Rating rating){
        String placeId = rating.getPlaceId();
        try {
            User user = userService.validateUser(rating.getUserId());
            Place place = placeService.validatePlace(placeId);
//            rating=validateNewRating(rating);
            Rating addedRating = addRatingDb(rating, user);
            userService.addRating(addedRating);
            placeService.addRating(placeId, addedRating);
            return ResponseEntity.ok("Rating added successfully");
        } catch (IllegalArgumentException e) {
            String errorMessage = "Invalid parameter: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }
    /**
     * Saves a new rating to the repository, ensuring all necessary default values are set.
     * @param rating The rating entity to be saved.
     * @return The saved rating entity.
     */
    public Rating addRatingDb(Rating rating, User user) {
        // Check if user already rated the place
        if (user.getRatings() != null) {
            for (String ratingId : user.getRatings()) {
                if (ratingId.equals(rating.getPlaceId())) {
                    throw new IllegalArgumentException("User has already rated this place.");
                }
            }
        }
        if(rating.getRatingId()==null){

        }
        if (rating.getTags() == null) {
            rating.setTags(Collections.emptyList()); // Empty list as default value
        }
        if (rating.getComment() == null) {
            rating.setComment(""); // Empty string as default value
        }
        if(rating.getComments()==null){
            rating.setComments(null);
        }
        if (rating.getDate() == null) {
            rating.setDate(new Date()); // Current date as default value
        }
        if (rating.getLikes() == null) {
            rating.setLikes(0); // 0 as default value
        }
        if (rating.getDislikes() == null) {
            rating.setDislikes(0); // 0 as default value
        }
        if (rating.getComments() == null) {
            rating.setComments(Collections.emptyList()); // Empty list as default value
        }
        if(rating.getFloor()==null){
            rating.setFloor(null);
        }
        Rating.OverallRating overallRating=rating.getOverallRating();
        Double overall=overallRating.getOverall();
        Double rating1=overallRating.getRating1();
        Double rating2=overallRating.getRating2();
        Double rating3=overallRating.getRating3();
        if(overall==null&&(rating1==null||rating2==null||rating3==null)){
            throw new IllegalArgumentException("ratings is invalid");
        }
        if (overall==null){
            overallRating.setOverall((rating1+rating2+rating3)/3.0);
        }else if(rating1==null){
            overallRating.setRating1(overall);
            overallRating.setRating2(overall);
            overallRating.setRating3(overall);
        }
        rating.setOverallRating(overallRating);

        return ratingRepository.save(rating);
    }


    /**
     * Retrieves all ratings from the repository.
     * @return A list of all ratings.
     */
    public List<Rating> getAllRatings() {
        return mongoTemplate.findAll(Rating.class);
    }
    public List<Rating> getAllRatingsDesc() {
        List<Rating> ratings = mongoTemplate.findAll(Rating.class);
        sortRatingsDescending(ratings);
        return ratings;
    }


    /**
     * Finds a rating by its ID.
     * @param id The ObjectId of the rating to find.
     * @return An Optional containing the found rating or empty if not found.
     */
    public Optional<Rating> getRateById(ObjectId id) {
        return Optional.ofNullable(mongoTemplate.findById(id, Rating.class));
    }

    /**
     * Updates an existing rating identified by ID with new details.
     * @param id The ObjectId of the rating to update.
     * @param rateDetails The new details for the rating.
     * @return The updated rating entity.
     */
    public Rating updateRate(ObjectId id, Rating rateDetails) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()
                .set("userId", rateDetails.getUserId())
                .set("tags", rateDetails.getTags())
                .set("comment", rateDetails.getComment())
                .set("date", rateDetails.getDate())
                .set("likes", rateDetails.getLikes())
                .set("dislikes", rateDetails.getDislikes())
                .set("comments", rateDetails.getComments());
        // Additional fields to be updated if needed
        mongoTemplate.updateFirst(query, update, Rating.class);
        return rateDetails;
    }



    /**
     * Deletes a rating by its ID.
     * @param id The ObjectId of the rating to delete.
     */
    public void deleteRatingDbT(ObjectId id) {
        ratingRepository.deleteById(id);
    }
    /**
     * Marks a rating as deleted without actually removing it from the repository.
     * Also updates the associated place to remove the rating.
     * @param id The ObjectId of the rating to mark as deleted.
     */
    //    fake delete, used usually
    public boolean deleteRatingDb(String id) {
        Optional<Rating> optionalRating = ratingRepository.findByIdAndNotDeleted(new ObjectId(id));
        if (optionalRating.isPresent()) {
            Rating rating = optionalRating.get();
            rating.setDeleted(true);
            rating.setDeletedDate(new Date());
            ratingRepository.save(rating);
            return true;
        } else {
            return false; // Rating not found
        }
    }
    @Transactional
    @Override
    public ResponseEntity<String> deleteRating(String id){
        try {
            Rating rating=validateRating(id);
            User user = userService.validateUser(rating.getUserId());
            Place place = placeService.validatePlace(rating.getPlaceId());
            boolean ratingDeleted = deleteRatingDb(id);
            boolean userDeleted = userService.deleteRating(rating);
            boolean placeDeleted = placeService.deleteRating(rating);
            if (!ratingDeleted || !userDeleted || !placeDeleted) {
                // If any deletion fails, return an INTERNAL_SERVER_ERROR response
                String errorMessage = "deleteError";
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
            }
            // If deletion is successful, return an OK response
            return ResponseEntity.ok("Rating deleted successfully");
        } catch (IllegalArgumentException e) {
            String errorMessage = "Invalid parameter: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }
    /**
     * Retrieves ratings with an overall rating greater than a specified value.
     * @param overallRating The minimum overall rating value.
     * @return A list of ratings meeting the criteria.
     */
    public List<Rating> getRatingsByOverallRatingGreaterThan(Double overallRating) {
        return ratingRepository.findByOverallRatingOverallGreaterThan(overallRating);
    }

    // Method to find ratings where rating1 is greater than a specified value
    public List<Rating> getRatingsByRating1GreaterThan(Double rating1) {
        return ratingRepository.findByOverallRatingRating1GreaterThan(rating1);
    }

    // Method to find ratings where rating2 is greater than a specified value
    public List<Rating> getRatingsByRating2GreaterThan(Double rating2) {
        return ratingRepository.findByOverallRatingRating2GreaterThan(rating2);
    }

    // Method to find ratings where rating3 is greater than a specified value
    public List<Rating> getRatingsByRating3GreaterThan(Double rating3) {
        return ratingRepository.findByOverallRatingRating3GreaterThan(rating3);
    }
    public List<Rating> getRatingsByFloor(int floor) {
        return ratingRepository.findByFloor(floor);
    }
    public List<Rating> getRatingsByOverallRating(Rating.OverallRating overallRating) {
        List<Rating> ratingsByOverallRating = null;
        List<Rating> ratingsByRating1 = null;
        List<Rating> ratingsByRating2 = null;
        List<Rating> ratingsByRating3 = null;
        List<Rating> commonRatings = getAllRatings();
        if (overallRating != null) {
            if (overallRating.getOverall() != -1) {
                ratingsByOverallRating = getRatingsByOverallRatingGreaterThan(overallRating.getOverall());
                commonRatings.retainAll(ratingsByOverallRating);
            }
            if (overallRating.getRating1() != -1) {
                ratingsByRating1 = getRatingsByRating1GreaterThan(overallRating.getRating1());
                commonRatings.retainAll(ratingsByRating1);
            }
            if (overallRating.getRating2() != -1) {
                ratingsByRating2 = getRatingsByRating2GreaterThan(overallRating.getRating2());
                commonRatings.retainAll(ratingsByRating2);
            }
            if (overallRating.getRating3() != -1) {
                ratingsByRating3 = getRatingsByRating3GreaterThan(overallRating.getRating3());
                commonRatings.retainAll(ratingsByRating3);
            }
        }
            //add here
        return commonRatings;
    }

    public List<Rating> getRatingByFilter(Rating.OverallRating overallRating, int floor) {
        if (overallRating == null && floor == -1) {
            return getAllRatings();
        }

        if (overallRating == null) {
            return new ArrayList<>(getRatingsByFloor(floor));
        }

        if (floor == -1) {
            return getRatingsByOverallRating(overallRating);
        }

        List<Rating> commonRatings = new ArrayList<>(getRatingsByFloor(floor));
        commonRatings.retainAll(getRatingsByOverallRating(overallRating));
        return commonRatings;
    }
    public List<Rating> getRatingByFilterDesc(Rating.OverallRating overallRating, int floor){
        List<Rating> ratings=getRatingByFilter(overallRating,floor);
        sortRatingsDescending(ratings);
        return ratings;
    }
    private void sortRatingsDescending(List<Rating> ratings) {
        Collections.sort(ratings, new Comparator<Rating>() {
            @Override
            public int compare(Rating r1, Rating r2) {
                return Double.compare(r2.getOverallRating().getOverall(), r1.getOverallRating().getOverall());
            }
        });
    }

}
