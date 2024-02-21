package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Service.IUserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void addUser(User user) {
        mongoTemplate.insert(user);
    }
    @Override
    public List<User> getUserById(ObjectId userId){
        mongoTemplate.findById(userId, User.class);
        return null;
    }

    @Override
    public void updateUsername(String userId, String newName) {
        Query query = new Query(Criteria.where("_id").is(userId));
        Update update = Update.update("name", newName);
        mongoTemplate.updateFirst(query, update, User.class);
    }
    @Override
    public void updateUserEmail(String userId, String newEmail) {
        Query query = new Query(Criteria.where("_id").is(userId));
        Update update = Update.update("email", newEmail);
        mongoTemplate.updateFirst(query, update, User.class);
    }
    @Override
    public void updateUserPassword(String userId, String newPassword) {
        Query query = new Query(Criteria.where("_id").is(userId));
        Update update = Update.update("password", newPassword);
        mongoTemplate.updateFirst(query, update, User.class);
    }
    @Override
    public void deleteUser(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        mongoTemplate.remove(query, User.class);
    }


    @Override
    public void deleteUser(ObjectId userId) {

    }
    @Override
    public List<User> getAllUser(){
        return mongoTemplate.findAll(User.class);

    }

}
