package com.astar.ratingbackend.Entity;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;

@Data
@Document("User")
@ApiModel(value = "User",description = "User")
public class User implements Serializable {
    @Field("_id")
    @ApiModelProperty(value = "Primary Key")
    private ObjectId userId;
    @Field("username")
    @ApiModelProperty(value = "username")
    private String username;
    @Field("email")
    @ApiModelProperty(value = "email")
    private String email;
    @Field("password")
    @ApiModelProperty(value = "password")
    private String password;
    @Field("name")
    @ApiModelProperty(value = "name")
    private String name;
    @Field("createDate")
    @ApiModelProperty(value = "created Date")
    private Date createDate;
    @Field("comments")
    @ApiModelProperty(value = "comments posted")
    private ObjectId[] comments;
    @Field("ratings")
    @ApiModelProperty(value = "ratings posted")
    private ObjectId[] ratings;
    @Field("places_added")
    @ApiModelProperty(value = "places added")
    private ObjectId[] placesAdded;

    @Field("isDeleted")
    @ApiModelProperty(value = "isDeleted")
    private boolean isDeleted;

    @Field("deletedDate")
    @ApiModelProperty(value = "deletedDate")
    private Date deletedDate;

}
