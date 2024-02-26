
/**
 * Project Name: Eagle_Rating
 * File Name:    PlaceController.java
 * Package Name: astar\ratingbackend\Controller
 *
 * Type: Controller
 * Purpose: Place Controller
 *
 * Created on: [2024-02-21]
 * Author: @Wenzhuo Ma
 *
 * History:
 * - [2024-02-21] Created by @Wenzhuo Ma
 * -
 * ...
 */

package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Service.Impl.PlaceServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/place")
public class PlaceController {
    @Autowired
    private PlaceServiceImpl placeService;


    @GetMapping("/get")
    public List<Place> getPlace(){
        return placeService.getAllPlaces();
    }
    @PostMapping("/add")
    public ResponseEntity<Void> addPlace(@RequestBody Place place){
        placeService.savePlace(place);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PostMapping("/addRating")
    public ResponseEntity<Place> addRating(@RequestParam ObjectId placeId, @RequestParam Rating rating) {
        ResponseEntity<Place> response = placeService.addRating(placeId, rating);
        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(response.getBody());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
