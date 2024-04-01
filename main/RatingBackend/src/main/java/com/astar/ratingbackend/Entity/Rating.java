
/**
 * Project Name: Eagle_Rating
 * File Name:    Rate.java
 * Package Name: com.astar.ratingbackend.Entity
 *
 * Type: Entity
 * Purpose: Rate Entity - Represents a rating in the system, including details such as the rating ID, user ID, tags, comment text, date of the rating, likes, dislikes, and associated comments.
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * - [Date] [Modification] [Modifier]
 * ...
 */

package com.astar.ratingbackend.Entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "Ratings")
public class Rating implements Serializable {

    @Id
    @Field("_id")
    private ObjectId ratingId;

    private String ratingIdStr;
    @PersistenceConstructor
    public Rating(ObjectId ratingId) {
        this.ratingId = ratingId;
        this.ratingIdStr = ratingId != null ? ratingId.toHexString() : null;
    }
    public Rating(){}

    @Field("userId")
    private String userId;
    @Field("placeId")
    private String placeId;

    @Field("tags")
    private Map<String, Boolean> tags;

    @Field("comment")
    private String comment;

    @Field("date")
    private Date date;
    @Field("floor")
    private Integer floor;
    @Field("likes")
    private Integer likes;

    @Field("dislikes")
    private Integer dislikes;

    @Field("comments")
    private List<ObjectId> comments;
    @Field("overallRating")
    private OverallRating overallRating;

    @Field("isDeleted")
    private boolean isDeleted;

    @Field("deletedDate")
    private Date deletedDate;

    @Data
    public static class OverallRating implements Serializable {
        private Double overall;
        private Double rating1;
        private Double rating2;
        private Double rating3;

    }


}
