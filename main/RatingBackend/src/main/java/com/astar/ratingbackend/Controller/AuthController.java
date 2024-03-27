package com.astar.ratingbackend.Controller;

import com.astar.ratingbackend.Entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.astar.ratingbackend.Service.IAuthService;
import com.astar.ratingbackend.Model.dto.AuthRequest;
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
}