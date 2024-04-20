package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.CommentFilterRequest;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Service.IPlaceService;
import com.astar.ratingbackend.Service.IRatingService;
import com.astar.ratingbackend.Service.IUserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

/**
 * Controller for managing rating entities.
 * Provides endpoints for CRUD operations and filtering on ratings.
 */
@RestController
@RequestMapping("/api/rating")
public class RatingController {
    @Autowired
    private MongoDatabaseFactory mongoDatabaseFactory;
    @Autowired
    private IRatingService ratingService;
    @Autowired
    private IPlaceService placeService;
    @Autowired
    private IUserService userService;

    /**
     * Retrieves all ratings from the database.
     * @return A list of all ratings.
     */
    @GetMapping("/getAll")
    public List<Rating> getAllRating(@RequestParam(required = false) Boolean desc){
        if(desc!=null&&desc){
            return ratingService.getAllRatingsDesc();
        }
        return ratingService.getAllRatings();
    }


    /**
     * Retrieves a specific rating by its ID.
     * @param ratingId The ID of the rating to retrieve.
     * @return A ResponseEntity containing the found rating or a not found status.
     */
    @GetMapping("/get")
    public ResponseEntity<Rating> getRatingById(@RequestParam String ratingId){
        try {
            ObjectId objectId = new ObjectId(ratingId);
            Optional<Rating> rating = ratingService.getRateById(objectId);
            return rating.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Invalid ObjectId format
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Other errors
        }
    }
    @PostMapping("/like")
    public ResponseEntity<Rating> likeRating(@RequestParam("userId") String userId, @RequestParam("ratingId") String ratingId, boolean like){
        try {
            // Call the service method to add like to the rating
            Rating updatedRating = ratingService.addLike(userId, ratingId, like);
            // Return a success response with the updated rating
            return ResponseEntity.ok(updatedRating);
        } catch (IllegalArgumentException e) {
            // Return a not found response if the rating ID doesn't exist
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            // Return a bad request response for any other exceptions
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/isLike")
    public int isLike(@RequestParam("userId") String userId, @RequestParam("ratingId") String ratingId){
        return ratingService.isLike(userId, ratingId);
    }

    /**
     * Deletes a specific rating by its ID.
     * @param ratingId The ID of the rating to delete.
     * @return A ResponseEntity indicating the outcome of the operation.
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteRatingById(@RequestParam String ratingId, @RequestParam(required = false) Boolean trueDelete) {
        if(trueDelete==null){
            trueDelete=true;
        }
        return ratingService.deleteRating(ratingId,trueDelete);

    }

    /**
     * Adds a new rating to the database.
     * @param rating The rating entity to be added.
     * @return A ResponseEntity containing the created rating or an error status.
     */
    @PostMapping("/addRating")
    public ResponseEntity<String> addRating(@RequestBody Rating rating) {
        try {
            // Save the rating to the database
            ratingService.addRating(rating);
            // Return a success response
            return ResponseEntity.ok("Rating added successfully!");
        } catch (Exception e) {
            // Handle exceptions and return appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add rating: " + e.getMessage());
        }
    }
    /**
     * Uploads images related to a rating.
     *
     * @param ratingId The ID of the rating to associate the images with.
     * @param images The array of images to upload.
     * @return ResponseEntity with a success or error message.
     */
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam String ratingId, @RequestParam MultipartFile[] images) {
        try {
            ratingService.uploadImage(ratingId, images);
            return ResponseEntity.ok("Images uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload images: " + e.getMessage());
        }
    }

    /**
     * Retrieves ratings that match specific filter criteria.
     * @param commentFilterRequest Contains the filter criteria for ratings.
     * @return A list of ratings that match the filter criteria.
     */
    @PostMapping("/filter")
    public List<Rating> getRatingByFilter(@RequestBody CommentFilterRequest commentFilterRequest) {
        Rating.OverallRating overallRating = commentFilterRequest.getOverallRating();
        int floor = commentFilterRequest.getFloor() != null ? commentFilterRequest.getFloor() : -1;
        return ratingService.getRatingByFilter(overallRating, floor);
    }
    @GetMapping("/userHasRated")
    public ResponseEntity<?> userHasRated(
            @RequestParam("userId") String userId,
            @RequestParam("placeId") String placeId) {
        Optional<Rating> ratingOpt = ratingService.findUserRatingForPlace(userId, placeId);
        if (ratingOpt.isPresent()) {
            // Return the found Rating object
            return ResponseEntity.ok(ratingOpt.get());
        } else {
            // Return false or some indication that the user hasn't rated
            return ResponseEntity.ok(false);
        }
    }

}
