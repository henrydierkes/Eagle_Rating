package com.astar.ratingbackend.Service;

import com.astar.ratingbackend.Entity.Rating;
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
    void addRating(Rating rating);

    User getUserByEmail(String email);

    boolean deleteRating(Rating rating);
    public User validateUser(String userId);

    boolean verifyUser(String email, String code);

    boolean uploadAvatar(ObjectId userId, byte[] avatarBytes);

    byte[] getAvatar(ObjectId userId);
    boolean clickBookMark(String userId, String placeId);;

    String[] getUserBookmarks(String userId);
}
