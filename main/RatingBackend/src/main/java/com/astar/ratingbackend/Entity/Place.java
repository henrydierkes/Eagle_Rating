
/**
 * Project Name: Eagle_Rating
 * File Name:    Place.java
 * Package Name: astar\ratingbackend\Entity
 *
 * Type: Entity
 * Purpose: Place Entity
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * -
 * ...
 */

package com.astar.ratingbackend.Entity;


import lombok.Data;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.List;

@Data
@Document("place")
public class Place implements Serializable {
    @Field("_locId")
    private ObjectId locId;

    @Field("locName")
    private String locName;

    @Field("category")
    private String category;

    @Field("location")
    private String location;

    @Field("campus")
    private String campus;

    @Field("tags")
    private List<String> tags;

    @Field("ratingCount")
    private Integer ratingCount;

    @Field("ratings")
    private List<ObjectId> ratings;

    @Field("images")
    private List<Image> images;

    // Nested class for Image documents within the "images" array
    public static class Image implements Serializable {
        @Field("imageId")
        private ObjectId imageId;

        @Field("data")
        private Binary data;

        @Field("description")
        private String description;

        public ObjectId getImageId() {
            return imageId;
        }

        public void setImageId(ObjectId imageId) {
            this.imageId = imageId;
        }

        public Binary getData() {
            return data;
        }

        public void setData(Binary data) {
            this.data = data;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}