package com.astar.ratingbackend.Model;

import com.astar.ratingbackend.Entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    List<User> findAllBy();
    @Query("{ '_id' : ?0, 'isDeleted' : false }")
    Optional<User> findByIdAndNotDeleted(ObjectId id);
    User findByEmail(String email);
    User findByUsername (String name);
    void deleteById(ObjectId id);
}
