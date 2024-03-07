package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.UserRepository;
import com.astar.ratingbackend.Service.IUserService;
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
    public void addRating(Rating rating){
        ObjectId userId = new ObjectId(rating.getUserId());
        User user = findUserById(userId);
        if (user != null) {
            // Update the user's ratings array
            List<ObjectId> ratings = new ArrayList<>();
            if (user.getRatings() != null) {
                ratings.addAll(Arrays.asList(user.getRatings()));
            }
            ratings.add(rating.getRatingId());
            user.setRatings(ratings.toArray(new ObjectId[0]));

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

}
