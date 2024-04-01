package com.astar.ratingbackend.Service.util;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Service.IRatingService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Util {
    private final MongoTemplate mongoTemplate;
    private final IRatingService ratingService;

    @Autowired
    public Util(MongoTemplate mongoTemplate, IRatingService ratingService) {
        this.mongoTemplate = mongoTemplate;
        this.ratingService = ratingService;
    }
    public String convert(ObjectId objectId) {
        return objectId != null ? objectId.toHexString() : null;
    }

    public void refreshPlace(Place place) {
        List<String> ratingIds = place.getRatingIds();
        List<Rating> ratingList = new ArrayList<>();
        place.setRatingCount(ratingIds.size());

        // Retrieve ratings from their IDs
        for (String ratingId : ratingIds) {
            Optional<Rating> optionalRating = ratingService.getRateById(new ObjectId(ratingId));
            if (optionalRating.isPresent()) {
                Rating rating = optionalRating.get();
                ratingList.add(rating);
            } else {
                throw new RuntimeException("Rating not found with id: " + ratingId);
            }
        }

        double overallRating = 0, rating1 = 0, rating2 = 0, rating3 = 0;
        Map<String, Integer> tags = new HashMap<String, Integer>();

        // Calculate overall and specific ratings
        for (Rating rating : ratingList) {
            Rating.OverallRating overallRatingObj = rating.getOverallRating();
            rating1 += overallRatingObj.getRating1();
            rating2 += overallRatingObj.getRating2();
            rating3 += overallRatingObj.getRating3();
            // Iterate over tags and update counts if true
            Map<String, Boolean> ratingTags = rating.getTags();
            for (Map.Entry<String, Boolean> entry : ratingTags.entrySet()) {
                String tag = entry.getKey();
                boolean tagValue = entry.getValue();
                if (tagValue) {
                    tags.put(tag, tags.getOrDefault(tag, 0) + 1);
                }
            }
        }
        overallRating = rating1 + rating2 + rating3;

        // Update total ratings in the place entity
        Place.TotalRating totalRating = place.getTotalRating();
        totalRating.setOverall(overallRating);
        totalRating.setRating1(rating1);
        totalRating.setRating2(rating2);
        totalRating.setRating3(rating3);
        place.setTotalRating(totalRating);
        place.setTags(tags);

        // Save the updated place to the database
        mongoTemplate.save(place);
    }
}
