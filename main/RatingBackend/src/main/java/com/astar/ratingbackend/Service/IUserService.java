package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface IUserService {

    List<User> getUserById(ObjectId userId);

    void updateUsername(String userId, String newName);

    void updateUserEmail(String userId, String newEmail);

    void updateUserPassword(String userId, String newPassword);

    public void deleteUser(ObjectId id);
    public void deleteUserT(ObjectId id);
    List<User> getAllUser();

    void addUser(User user);
}
