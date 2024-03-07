package com.astar.ratingbackend.Service.Impl;

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

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

}
