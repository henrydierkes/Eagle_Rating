package com.astar.ratingbackend.Entity;


import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;

@Data
@Document("User")
public class User implements Serializable {
    @Field("_id")
    private ObjectId userId;
    @Field("username")
    private String username;
    @Field("email")
    private String email;
    @Field("password")
    private String password;
    @Field("name")
    private String name;
    @Field("createDate")
    private Date createDate;
    @Field("comments")
    private ObjectId[] comments;
    @Field("ratings")
    private ObjectId[] ratings;
    @Field("places_added")
    private ObjectId[] placesAdded;

    @Field("isDeleted")
    private boolean isDeleted;

    @Field("deletedDate")
    private Date deletedDate;

}
