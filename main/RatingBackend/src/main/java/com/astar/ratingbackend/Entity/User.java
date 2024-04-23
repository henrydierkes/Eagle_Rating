package com.astar.ratingbackend.Entity;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Base64;
import java.util.Date;

@Data
@Document("User")
@ApiModel(value = "User",description = "User")
public class User implements Serializable {

    @Id
    @Field("_id")
    @ApiModelProperty(value = "Primary Key")
    private ObjectId userId;

    private String userIdStr;
    @PersistenceConstructor
    public User(ObjectId userId) {
        this.userId = userId;
        this.userIdStr = userId != null ? userId.toHexString() : null;
    }
    public byte[] getAvatarData() {
        if (avatar != null) {
            return Base64.getDecoder().decode(avatar);
        } else {
            return null;
        }
    }

    public User(){}
    @Field("username")
    @ApiModelProperty(value = "username")
    private String username;
    @Field("email")
    @ApiModelProperty(value = "email")
    private String email;
    @Field("password")
    @ApiModelProperty(value = "password")
    private String password;
    @Field("avatar")
    @ApiModelProperty(value = "avatar")
    private String avatar;
    @Field("createDate")
    @ApiModelProperty(value = "created Date")
    private Date createDate;
    @Field("ratings")
    @ApiModelProperty(value = "ratings posted")
    private String[] ratings;
    @Field("places_added")
    @ApiModelProperty(value = "places added")
    private String[] placesAdded;
    @Field("bookmarks")
    private String[] bookmarks;
    @Field("isDeleted")
    @ApiModelProperty(value = "isDeleted")
    private boolean isDeleted;

    @Field("deletedDate")
    @ApiModelProperty(value = "deletedDate")
    private Date deletedDate;

    @Field("authCode")
    @ApiModelProperty(value = "Authentication Code")
    private String authCode;

    @Field("isVerified")
    @ApiModelProperty(value = "Verification Status")
    private boolean isVerified = false;

}
