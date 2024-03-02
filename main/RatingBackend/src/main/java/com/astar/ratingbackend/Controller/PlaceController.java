
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
import com.astar.ratingbackend.Service.IPlaceService;
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
    private IPlaceService placeService;


    @GetMapping("/get")
    public List<Place> getPlace(@RequestParam(required = false) Boolean desc){
        List <Place> places=placeService.getAllPlaces();
        if(desc!=null&&desc){
            placeService.sortRatingsDescending(places);
        }
        return places;
    }
    @PostMapping("/add")
    public ResponseEntity<Void> addPlace(@RequestBody Place place){
        placeService.addPlace(place);
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
    @GetMapping("/search")
    public ResponseEntity<List<Place>> searchByLocNameAndCategoryAndTagsAll(
            @RequestParam(required = false) String locName,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) Boolean desc
    ) {
        List<Place> places = placeService.searchByLocNameAndCategoryAndTagsAll(locName, category, tags);
        if(desc!=null&&desc){
            placeService.sortRatingsDescending(places);
        }
        return ResponseEntity.ok(places);
    }

    // Endpoint to search places by name and category
    @GetMapping("/search/category")
    public ResponseEntity<List<Place>> searchPlacesByNameAndCategory(@RequestParam String name, @RequestParam String category,@RequestParam(required = false) Boolean desc) {
        List<Place> places= placeService.searchPlacesByNameAndCategory(name, category);
        if(desc!=null&&desc){
            placeService.sortRatingsDescending(places);
        }
        return ResponseEntity.ok(places);
    }
    @GetMapping("/search/tags")
    public ResponseEntity<List<Place>> searchByTags(@RequestParam List<String> tags,@RequestParam(required = false) Boolean desc) {
        List<Place> places = placeService.searchByTags(tags);
        if(desc!=null&&desc){
            placeService.sortRatingsDescending(places);
        }
        return ResponseEntity.ok(places);
    }
}
