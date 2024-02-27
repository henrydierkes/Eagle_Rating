package com.astar.ratingbackend;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.UserRepository;
import com.astar.ratingbackend.Service.IPlaceService;
import com.astar.ratingbackend.Service.IRatingService;
import com.astar.ratingbackend.Service.IUserService;
import com.astar.ratingbackend.Service.util.Util;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@SpringBootTest
class RatingBackendApplicationTests {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IPlaceService placeService;
    @Autowired
    private IRatingService ratingService;
    @Autowired
    private IUserService userService;
    @Autowired
    private Util util;

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
        user.setCreatedAt(new Date().toString());
        userRepository.save(user);
    }
    @Test
    void testPlaceRefresh() {
        List<Place> places = placeService.getAllPlaces();
        for (Place place : places) {
            util.refreshPlace(place);
        }
    }
    @Test
    void testTotalRating() {
        ObjectId id = new ObjectId("65d51531fa7f55b417232cba");
        Optional<Place> optionalPlace = placeService.findById(id);

        if (optionalPlace.isPresent()) {
            Place place = optionalPlace.get();
            Place.TotalRating totalRating = place.getTotalRating();
            // Perform assertions on totalRating to ensure it's correct
            // For example:

        }
    }
    @Test
    void deleteUser(){
        ObjectId id= new ObjectId("65d574294bb7330ced78f1ba");
        userService.deleteUser(id);
    }
    @Test
    void deletePlace(){
        ObjectId id= new ObjectId("65de4b11e0e2413bed3f005a");
        placeService.deletePlace(id);
    }
    @Test
    void findUser(){
        ObjectId id= new ObjectId("65d574294bb7330ced78f1ba");
        User user=userService.findUserById(id);
        System.out.println(user);
    }
    @Test
    void testAverageRating(){
        List<Place> places = placeService.getAllPlaces();
        for (Place place : places) {
            Map<String, Double> averageRatings = placeService.getAverageRatings(place.getLocId());
            for(String s:averageRatings.keySet()){
                System.out.println(s+": "+averageRatings.get(s));
            }
        }
    }



    @Test
    void TestPlaceGet(){
        List<Place> places=placeService.getAllPlaces();
    }
    @Test
    void TestRatingGet(){
        List<Rating> ratings=ratingService.getAllRatings();
    }
    @Test
    void contextLoads() {
    }

}
