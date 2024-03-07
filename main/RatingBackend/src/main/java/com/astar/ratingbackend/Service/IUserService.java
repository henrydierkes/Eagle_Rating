package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.User;
import org.bson.types.ObjectId;

import java.util.List;

public interface IUserService {

    User findUserById(ObjectId id);

    void updateUsername(ObjectId id, String newName);

    void updateUserEmail(ObjectId id, String newEmail);

    void updateUserPassword(ObjectId id, String newPassword);

    public void deleteUser(ObjectId id);
    public void deleteUserT(ObjectId id);
    List<User> getAllUser();

    void addUser(User user);
}
