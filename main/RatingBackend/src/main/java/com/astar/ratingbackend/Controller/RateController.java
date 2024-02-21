/**
 * Project Name: Eagle_Rating
 * File Name:    RateController.java
 * Package Name: com.astar.ratingbackend.Controller
 *
 * Type: Controller
 * Purpose: Rate Controller
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

import com.astar.ratingbackend.Entity.Rate; // Assuming you have a Rate entity
import com.astar.ratingbackend.Service.RateService; // Assuming there's a RateService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rate") // Changed from /api/place to /api/rate
public class RateController {
    @Autowired
    private RateService rateService; // Changed from PlaceService to RateService

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/get")
    public List<Rate> getRates(){ // Method and return type changed to reflect rates
        return rateService.getAllRates(); // Assuming a method getAllRates() in RateService
    }
}
