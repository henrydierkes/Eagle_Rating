/**
 * Project Name: Eagle_Rating
 * File Name:    RateController.java
 * Package Name: com.astar.ratingbackend.Controller
 *
 * Type: Controller
 * Purpose: Rate Controller
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * -
 * ...
 */

package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Service.IRatingService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rate") // Changed from /api/place to /api/rate
public class RatingController {
    @Autowired
    private IRatingService ratingService; // Changed from PlaceService to RateService


    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/getAll")
    public List<Rating> getAllRating(){
        return ratingService.getAllRatings();
    }
    @PostMapping("/get")
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
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteRatingById(@RequestParam String ratingId) {
        try {
            ObjectId objectId = new ObjectId(ratingId);
            ratingService.deleteRating(objectId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Invalid ObjectId format
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Other errors
        }
    }
    @PostMapping("/add")
    public ResponseEntity<Rating> addRating(@RequestBody Rating rating) {
        try {
            Rating savedRating = ratingService.addRating(rating);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRating);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
