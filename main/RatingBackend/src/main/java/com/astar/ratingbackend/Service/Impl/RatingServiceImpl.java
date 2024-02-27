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

import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Model.RatingRepository;
import com.astar.ratingbackend.Service.IPlaceService;
import com.astar.ratingbackend.Service.IRatingService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements IRatingService {
    private final com.astar.ratingbackend.Model.RatingRepository ratingRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private IPlaceService placeService;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    // Save a new rate
    public Rating addRating(Rating rating) {
        if(rating.getRatingId()==null){

        }
        if (rating.getTags() == null) {
            rating.setTags(Collections.emptyList()); // Empty list as default value
        }
        if (rating.getComment() == null) {
            rating.setComment(""); // Empty string as default value
        }if (rating.getDate() == null) {
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

        return ratingRepository.save(rating);
    }


    // Retrieve all rates
    public List<Rating> getAllRatings() {
        return mongoTemplate.findAll(Rating.class);
    }

    // Find a rate by ID
    public Optional<Rating> getRateById(ObjectId id) {
        return Optional.ofNullable(mongoTemplate.findById(id, Rating.class));
    }

    // Update an existing rate
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




    public void deleteRatingT(ObjectId id) {
        ratingRepository.deleteById(id);
    }

    //    fake delete, used usually
    public void deleteRating(ObjectId id) {
        ratingRepository.findByIdAndNotDeleted(id).ifPresent(rating -> {
            rating.setDeleted(true);
            rating.setDeletedDate(new Date());
            ratingRepository.save(rating);
            placeService.removeRating(rating.getPlaceId(),rating);
        });
    }
}
