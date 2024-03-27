package com.astar.ratingbackend.Entity;

import lombok.Data;

@Data
public class AddPlaceRequest {
    Place place;
    String userId;
    String comment;
}
