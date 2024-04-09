
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

import com.astar.ratingbackend.Entity.AddPlaceRequest;
import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Service.IPlaceService;
import com.astar.ratingbackend.Service.IRatingService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
     * @param addPlaceRequest The Place entity to be added.
     * @return A response entity indicating the operation's status (CREATED).
     */
    @PostMapping("/add")
    @CrossOrigin
    @Transactional
    public ResponseEntity<Place> addPlace(@RequestBody AddPlaceRequest addPlaceRequest) {
        Place place=addPlaceRequest.getPlace();
        String userId=addPlaceRequest.getUserId();
        Place.TotalRating totalRating=place.getTotalRating();
        Map<String, Integer> tags = place.getTags();
        Map<String, Boolean> tagsMap = new HashMap<>();
        for (Map.Entry<String, Integer> entry : tags.entrySet()) {
            tagsMap.put(entry.getKey(), entry.getValue() == 1); // Convert Integer to Boolean
        }
        Integer floor = place.getFloor();
        String comment=addPlaceRequest.getComment();
        Place addedPlace = placeService.addPlace(place);
        if(totalRating.getOverall()!=0||(totalRating.getRating1()+totalRating.getRating2()+ totalRating.getRating3())!=0||comment!=null){
            Rating rating=new Rating();
            rating.setUserId(userId);
            rating.setPlaceId(addedPlace.getLocId().toString());
            Rating.OverallRating overallRating=new Rating.OverallRating();
            overallRating.setOverall(totalRating.getOverall());
            overallRating.setRating1(totalRating.getRating1());
            overallRating.setRating2(totalRating.getRating2());
            overallRating.setRating3(totalRating.getRating3());
            rating.setOverallRating(overallRating);
            rating.setComment(comment);
            rating.setDate(new Date());
            rating.setFloor(floor);
            rating.setTags(tagsMap);
            ratingService.addRating(rating);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(addedPlace);

    }
    @GetMapping("/places/getUnverified")
    public ResponseEntity<List<Place>> getUnverified(@RequestParam(required = false) String category) {
        List<Place> unverifiedPlaces = placeService.findUnverified(category);
        return new ResponseEntity<>(unverifiedPlaces, HttpStatus.OK);
    }
    @PostMapping("/places/verifyPlaces")
    public ResponseEntity<List<Place>> verifyPlaces(@RequestParam("ids") List<String> ids){
        List<Place> place=placeService.verifyPlaces(ids);
        return new ResponseEntity<>(place,HttpStatus.OK);
    }
    @PostMapping("/places/verifyPlace")
    public ResponseEntity<Place> verifyPlace(@RequestParam("id") String id){
        Place place=placeService.verifyPlace(id);
        return new ResponseEntity<>(place,HttpStatus.OK);
    }

    @PostMapping("/delete")
    @CrossOrigin
    @Transactional
    public ResponseEntity<String> deletePlace(@RequestParam("userId") String userId, @RequestParam("placeId") String placeId, @RequestParam(required = false)Boolean trueDelete) {
        if (trueDelete == null) {
            trueDelete = true;
        }
        try {
            List<String> ratingIds = placeService.deletePlace(userId, placeId, trueDelete);
            ratingService.cleanRatings(ratingIds, trueDelete);

            // Return a success response
            return ResponseEntity.ok("Place and associated ratings deleted successfully");
        } catch (Exception e) {
            // Handle the exception and return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    /**
     * Searches for places based on location name, category, and tags. All parameters are optional.
     * @param locName Optional location name for filtering places.
     * @return A response entity containing a list of places that match the search criteria.
     */
    @GetMapping("/search")
    @CrossOrigin
    public ResponseEntity<List<Place>> searchPlaces(
            @RequestParam(required = false) String locName,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) Boolean desc
    ) {
        List<Place> places = placeService.searchByLocNameAndCategoryAndTagsAll(locName,category,tags);
        if(desc!=null&&desc){
            placeService.sortRatingsDescending(places);
        }
        return ResponseEntity.ok(places);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable String id) {
        // Convert the string ID to an ObjectId
        ObjectId objectId;
        try {
            objectId = new ObjectId(id);
        } catch (IllegalArgumentException e) {
            // If the string cannot be converted to an ObjectId, return bad request
            return ResponseEntity.badRequest().build();
        }

        Optional<Place> place = placeService.findById(objectId);
        return place.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/getTrendy")
    public ResponseEntity<List<Place>> getTrendyPlace(@RequestParam(required = false) Integer num){
        if(num==null){
            return ResponseEntity.ok(placeService.findTopPlaces());
        }else{
            return ResponseEntity.ok(placeService.findTopPlaces(num));
        }
    }

}
