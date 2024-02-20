package com.astar.ratingbackend;

import com.astar.ratingbackend.Entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

@SpringBootTest
class RatingBackendApplicationTests {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    public void test1() {
        List<User> userList = mongoTemplate.findAll(User.class);
        if (userList != null && userList.size() > 0) {
            userList.forEach(user -> {
                System.out.println(user.toString());
            });
        }
    }
    @Test
    void contextLoads() {
    }

}
