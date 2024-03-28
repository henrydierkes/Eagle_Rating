package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.UserRepository;
import com.astar.ratingbackend.Service.IUserService;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private MongoTemplate mongoTemplate;
    private final com.astar.ratingbackend.Model.UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void addUser(User user) {
        if(user.getComments()==null){
            user.setComments(null);
        }
        if(user.getCreateDate()==null){
            user.setCreateDate(new Date());
        }
        user.setDeleted(false);
        user.setDeletedDate(null);
        user.setName(user.getUsername());
        user.setRatings(null);
        mongoTemplate.insert(user);
    }
    @Override
    public User findUserById(ObjectId id) {
        Optional<User> userOptional = Optional.ofNullable(mongoTemplate.findById(id, User.class));
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            return null;
        }
    }
    @Override
    public void updateUsername(ObjectId id, String newName) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = Update.update("name", newName);
        mongoTemplate.updateFirst(query, update, User.class);
    }
    @Override
    public void updateUserEmail(ObjectId id, String newEmail) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = Update.update("email", newEmail);
        mongoTemplate.updateFirst(query, update, User.class);
    }
    @Override
    public void updateUserPassword(ObjectId id, String newPassword) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = Update.update("password", newPassword);
        mongoTemplate.updateFirst(query, update, User.class);
    }
    @Override
    public void deleteUser(ObjectId id) {
        User user = findUserById(id);
        if (user != null && !user.isDeleted()) {
            user.setDeleted(true);
            user.setDeletedDate(new Date());
            mongoTemplate.save(user); // Saving the updated user object
        }
    }


    @Override
    public void deleteUserT(ObjectId id) {
        userRepository.deleteById(id);
    }
    @Override
    public List<User> getAllUser(){
        return mongoTemplate.findAll(User.class);

    }

    @Override
    public User validateUser(String userId) {
        ObjectId userIdObj = new ObjectId(userId);
        User user = findUserById(userIdObj);
        if (user == null || user.isDeleted()) {
            throw new IllegalArgumentException("User not found or deleted with ID: " + userId);
        }
        return user;
    }
    @Override
    public void addRating(Rating rating){
        ObjectId userId = new ObjectId(rating.getUserId());
        User user = findUserById(userId);
        if (user != null) {
            // Update the user's ratings array
            List<String> ratings = new ArrayList<>();
            if (user.getRatings() != null) {
                ratings.addAll(Arrays.asList(user.getRatings()));
            }
            ratings.add(rating.getRatingId().toString());
            user.setRatings(ratings.toArray(new String[0]));

            // Save the updated user object back to the database
            Query query = new Query(Criteria.where("_id").is(userId));
            Update update = new Update().set("ratings", user.getRatings());

            mongoTemplate.updateFirst(query, update, User.class);
        } else {
            Query query = new Query(Criteria.where("_id").is(userId));
            Update update = new Update().set("ratings", user.getRatings());

            mongoTemplate.updateFirst(query, update, User.class); // Assuming you have a method to save the updated user object
        }
    }
    @Override
    public User getUserByEmail(String email) {
        // Check if the email exists
        Query query = new Query(Criteria.where("email").is(email));
        List<User> users = mongoTemplate.find(query, User.class);
        if (users.isEmpty()) {
            throw new IllegalArgumentException("User with email " + email + " not found.");
        } else if (users.size() > 1) {
            throw new IllegalArgumentException("Multiple users found with email " + email + ". Email should be unique.");
        } else {
            User user=users.get(0);
            user.setUserIdStr(user.getUserId().toString());
            return user;
        }
    }

    @Override
    public boolean deleteRating(Rating rating) {
        ObjectId userId = new ObjectId(rating.getUserId());
        User user = findUserById(userId);
        if (user != null && !user.isDeleted()) {
            // Update the user's ratings array

            String ratingIdString = rating.getRatingId() != null ? rating.getRatingId().toString() : null;
            if (ratingIdString == null) {
                return false; // Rating ID is null, cannot proceed with deletion
            }
            List<String> ratings = new ArrayList<>();
            if (user.getRatings() != null) {
                ratings.addAll(Arrays.asList(user.getRatings()));
            }
            if (!ratings.contains(rating.getRatingId().toString())) {
                // Rating not found in user's ratings array
                return false;
            }
            ratings.remove(rating.getRatingId().toString());
            user.setRatings(ratings.toArray(new String[0]));

            // Save the updated user object back to the database
            Query query = new Query(Criteria.where("_id").is(userId));
            Update update = new Update().set("ratings", user.getRatings());

            UpdateResult result = mongoTemplate.updateFirst(query, update, User.class);
            return result.getModifiedCount() > 0;
        } else {
            return false;
        }
    }

}
