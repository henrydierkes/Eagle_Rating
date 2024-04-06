package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Service.IUserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing user entities.
 * Provides endpoints for CRUD operations on users.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private IUserService userService;

    /**
     * Retrieves all users from the database.
     * @return A list of all users.
     */
    @GetMapping("/getAll")
    public List<User> getUser(){
        return userService.getAllUser();
    }

    /**
     * Retrieves a specific user by their ID.
     * @param userID The ID of the user to retrieve.
     * @return The user matching the provided ID.
     */
    @GetMapping("/get")
    public User getUserById(@RequestParam String userID){
        return userService.findUserById(new ObjectId(userID));
    }

    /**
     * Adds a new user to the database.
     * @param user The user entity to be added.
     * @return A ResponseEntity indicating the operation's outcome, with a message.
     */
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            userService.addUser(user);
            return ResponseEntity.status(HttpStatus.OK).body("User added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add user");
        }
    }

    /**
     * Registers a new user. This might include additional logic specific to registration.
     * @param user The user entity to register.
     * @return A ResponseEntity indicating the outcome of the registration, with a message.
     */
    @PostMapping("/register")
    public ResponseEntity<String> userRegister(@RequestBody User user) {
        try {
            userService.addUser(user);
            return ResponseEntity.status(HttpStatus.OK).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add user");
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> userDelete(@RequestParam String userId){
        try{
            userService.deleteUser(new ObjectId(userId));
            return ResponseEntity.status(HttpStatus.OK).body("User soft delete successfully");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }
    /**
     * Finds a user with email
     * @param email The user entity to be added.
     * @return A ResponseEntity user
     */
    @GetMapping("/getByEmail")
    public ResponseEntity<?> getUserByEmail(@RequestParam("email") String email) {
        try {
            User user = userService.getUserByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for email: " + email);
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get user by email");
        }
    }
//    @PostMapping("/login")
//    public ResponseEntity<String> userLogin(@RequestParam("email")String email, @RequestParam("password")String password) {
//        try {
//
//            // Call the service method to add the user
//            userService.
//
//            // Return a success response
//            return ResponseEntity.status(HttpStatus.OK).body("User registered successfully");
//        } catch (Exception e) {
//            // If any exception occurs during user addition, return a failure response
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add user");
//        }
//    }
}
