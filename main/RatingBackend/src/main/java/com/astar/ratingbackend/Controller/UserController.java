package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private IUserService userService;


    @GetMapping("/get")
    public List<User> getUser(){
        return userService.getAllUser();
    }
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {

            // Call the service method to add the user
            userService.addUser(user);

            // Return a success response
            return ResponseEntity.status(HttpStatus.OK).body("User added successfully");
        } catch (Exception e) {
            // If any exception occurs during user addition, return a failure response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add user");
        }
    }
}
