package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Service.IUserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.astar.ratingbackend.Model.dto.VerificationRequest;
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

    /**
     * Updates the username of a user.
     * @param userId The ID of the user to update.
     * @param newUsername The new username to set.
     * @return A ResponseEntity indicating the operation's outcome, with a message.
     */
    @PostMapping("/updateUsername")
    public ResponseEntity<String> updateUsername(@RequestParam("userId") String userId, @RequestParam("newUsername") String newUsername) {
        try {
            userService.updateUsername(new ObjectId(userId), newUsername);
            return ResponseEntity.status(HttpStatus.OK).body("Username updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update username");
        }
    }
    /**
     * Updates the password of a user.
     * @param userId The ID of the user to update.
     * @param newPassword The new password to set.
     * @return A ResponseEntity indicating the operation's outcome, with a message.
     */
    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestParam("userId") String userId, @RequestParam("newPassword") String newPassword) {
        try {
            userService.updateUserPassword(new ObjectId(userId), newPassword);
            return ResponseEntity.status(HttpStatus.OK).body("Password updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update password");
        }
    }


    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestBody VerificationRequest verificationRequest) {
        boolean isVerified = userService.verifyUser(verificationRequest.getEmail(), verificationRequest.getCode());
        if (isVerified) {
            return ResponseEntity.ok("Email verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Verification failed. Invalid code or email.");
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
