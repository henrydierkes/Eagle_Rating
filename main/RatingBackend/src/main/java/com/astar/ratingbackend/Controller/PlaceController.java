
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
import com.astar.ratingbackend.Service.IPlaceService;
import com.astar.ratingbackend.Service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/place")
public class PlaceController {
    @Autowired
    private IPlaceService placeService;
    @Autowired
    private IRatingService ratingService;

    /**
     * Retrieves all places stored in the database.
     * @return A list of all places.
     */
    @GetMapping("/get")
    @CrossOrigin
    public List<Place> getPlace(@RequestParam(required = false) Boolean desc){
        List <Place> places=placeService.getAllPlaces();
        if(desc!=null&&desc){
            placeService.sortRatingsDescending(places);
        }
        return places;
    }

    /**
     * Adds a new place to the database.
     * @param place The Place entity to be added.
     * @return A response entity indicating the operation's status (CREATED).
     */
    @PostMapping("/add")
    @CrossOrigin
    public ResponseEntity<Place> addPlace(@RequestBody Place place) {
        Place addedPlace = placeService.addPlace(place);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedPlace);
    }

    /**
     * Adds a rating to a specific place based on the place's ID.
     * @param rating The Rating entity to be added to the place.
     * @return A response entity containing the updated place with the new rating or an error status.
     */
//    @PostMapping("/addRating")
//    public ResponseEntity<Place> addRating(@RequestBody Rating rating) {
//        String placeId = rating.getPlaceId();
//        ResponseEntity<Place> response = placeService.addRating(placeId, rating);
//        ratingService.addRating(rating,);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            return ResponseEntity.ok(response.getBody());
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }

    /**
     * Searches for places based on location name, category, and tags. All parameters are optional.
     * @param locName Optional location name for filtering places.
     * @param category Optional category for filtering places.
     * @param tags Optional list of tags for filtering places.
     * @return A response entity containing a list of places that match the search criteria.
     */
    @GetMapping("/search")
    @CrossOrigin
    public ResponseEntity<List<Place>> searchByLocNameAndCategoryAndTagsAll(
            @RequestParam(required = false) String locName,
            @RequestParam(required = true) String category,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) Boolean desc
    ) {
        List<Place> places = placeService.searchByLocNameAndCategoryAndTagsAll(locName, category, tags);
        if(desc!=null&&desc){
            placeService.sortRatingsDescending(places);
        }
        return ResponseEntity.ok(places);
    }

    /**
     * Searches for places by name and category.
     * @param name The name of the location to search for.
     * @param category The category of the places to search for.
     * @return A list of places that match the name and category.
     */
//    @GetMapping("/search/category")
//    public ResponseEntity<List<Place>> searchPlacesByNameAndCategory(@RequestParam String name, @RequestParam String category,@RequestParam(required = false) Boolean desc) {
//        List<Place> places= placeService.searchPlacesByNameAndCategory(name, category);
//        if(desc!=null&&desc){
//            placeService.sortRatingsDescending(places);
//        }
//        return ResponseEntity.ok(places);
//    }

//    /**
//     * Searches for places by tags.
//     * @param tags The list of tags to filter the places.
//     * @return A response entity containing a list of places that match the tags.
//     */
//    @GetMapping("/search/tags")
//    public ResponseEntity<List<Place>> searchByTags(@RequestParam List<String> tags,@RequestParam(required = false) Boolean desc) {
//        List<Place> places = placeService.searchByTags(tags);
//        if(desc!=null&&desc){
//            placeService.sortRatingsDescending(places);
//        }
//        return ResponseEntity.ok(places);
//    }
}
