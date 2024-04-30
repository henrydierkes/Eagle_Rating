package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.User;

public interface IAuthService {
    User signUp(User user);
    String signIn(String email, String password);

    void resetPassword(String email);
}
