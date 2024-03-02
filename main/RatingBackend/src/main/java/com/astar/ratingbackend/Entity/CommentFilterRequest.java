package com.astar.ratingbackend.Entity;

import lombok.Data;

@Data
public class CommentFilterRequest {
    Rating.OverallRating overallRating;
    Integer floor;
}
