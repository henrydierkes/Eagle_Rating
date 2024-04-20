package com.astar.ratingbackend.Entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;

@Data
public class AddRatingRequest {
    private String userId;
    private String placeId;
    private String comment;
    private Date date;
    private Map<String, Boolean> tags;
//    private MultipartFile[] images;
    private OverallRating overallRating;
    @Data
    public static class OverallRating implements Serializable {
        private Double overall;
        private Double rating1;
        private Double rating2;
        private Double rating3;


    }

}