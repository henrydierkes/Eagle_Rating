
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
import com.astar.ratingbackend.Service.Impl.PlaceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void addPlace(@RequestBody Place place){

    }
}
