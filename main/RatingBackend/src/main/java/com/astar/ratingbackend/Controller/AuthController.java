package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.dto.AuthRequest;
import com.astar.ratingbackend.Service.IAuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final IAuthService authService;

    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @CrossOrigin
    @PostMapping("/sign-up")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        return ResponseEntity.ok(authService.signUp(user));
    }

    @CrossOrigin
    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.signIn(request.getEmail(), request.getPassword()));
    }

    @CrossOrigin
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email) {
        try {
            // Call the resetPassword method in the authService
            authService.resetPassword(email);

            // If the password reset is successful, return a success response
            return ResponseEntity.ok("A temporary password has been sent to your email.");
        } catch (NoSuchElementException e) {
            // If the email does not exist, return a 404 Not Found response with an error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email " + email + " not found.");
        } catch (IllegalArgumentException e) {
            // If an IllegalArgumentException occurs, return a 400 Bad Request response with an error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Handle any other unexpected exceptions and return a 500 Internal Server Error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while resetting the password. Please try again later.");
        }
    }
}