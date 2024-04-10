package com.astar.ratingbackend.Model.dto;
public class VerificationRequest {
    private String email;
    private String code;

    // Constructors, getters, and setters
    public VerificationRequest() {}

    public VerificationRequest(String email, String code) {
        this.email = email;
        this.code = code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
