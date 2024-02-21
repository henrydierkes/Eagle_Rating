package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface IUserService {
    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(ObjectId userId);
    List<User> getAllUser();

}
