package com.astar.ratingbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoTemplate;


@SpringBootApplication
public class RatingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RatingBackendApplication.class, args);
    }
    @Autowired
    private MongoTemplate mongoTemplate;

    @Bean
    MongoTransactionManager transactionManager() {
        return new MongoTransactionManager(mongoTemplate.getMongoDbFactory());
    }

}
