package com.astar.ratingbackend.Model.dto;
public class AuthRequest {
    private String email;
    private String password;

    // Default constructor for JSON parsing
    public AuthRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
