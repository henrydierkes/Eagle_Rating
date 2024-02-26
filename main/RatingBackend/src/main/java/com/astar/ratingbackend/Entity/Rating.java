
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
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "Ratings")
public class Rating implements Serializable {

    @Id
    @Field("ratingId")
    private ObjectId ratingId;

    @Field("userId")
    private String userId;

    @Field("tags")
    private List<String> tags;

    @Field("comment")
    private String comment;

    @Field("date")
    private Date date;

    @Field("likes")
    private Integer likes;

    @Field("dislikes")
    private Integer dislikes;

    @Field("comments")
    private List<ObjectId> comments;

    // Lombok @Data generates constructors, getters, setters, equals, hashCode, and toString methods.
}
