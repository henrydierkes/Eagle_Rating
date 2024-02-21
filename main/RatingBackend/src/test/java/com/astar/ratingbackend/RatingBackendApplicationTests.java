package com.astar.ratingbackend;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Date;
import java.util.List;

@SpringBootTest
class RatingBackendApplicationTests {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;

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
    void testInsert(){
        User user= new User();
        user.setName("Tuan");
        user.setEmail("tt123@emory.edu");
        user.setPassword("123456");
        user.setCreatedAt(new Date());
        userRepository.save(user);
    }

    @Test
    void contextLoads() {
    }

}
