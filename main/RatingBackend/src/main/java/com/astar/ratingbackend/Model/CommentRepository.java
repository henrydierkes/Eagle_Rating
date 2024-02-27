package com.astar.ratingbackend.Model;

import com.astar.ratingbackend.Entity.Comment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, ObjectId> {
    // Example custom query method
    @Query("{ '_id' : ?0, 'isDeleted' : false }")
    Optional<Comment> findByIdAndNotDeleted(ObjectId id);

    // Standard findById method
    Optional<Comment> findById(ObjectId id);
}