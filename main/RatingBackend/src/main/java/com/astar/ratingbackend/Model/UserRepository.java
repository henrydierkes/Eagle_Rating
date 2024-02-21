package com.astar.ratingbackend.Model;

import com.astar.ratingbackend.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllBy();

}
