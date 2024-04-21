package com.astar.ratingbackend;

import com.astar.ratingbackend.Model.UserRepository;
import com.astar.ratingbackend.Service.IPlaceService;
import com.astar.ratingbackend.Service.IRatingService;
import com.astar.ratingbackend.Service.IUserService;
import com.astar.ratingbackend.Service.util.Util;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

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

//    @Test
//    public void testRatingDelete(){
//        List<String> ratingIds=new ArrayList<>();
//        ratingIds.add("6612dc796c40577e66379ad8");
//        ratingService.cleanRatings(ratingIds, false);
//    }
    @Test
    public void testGetImage(){
        String placeId="65d51531fa7f55b417232cba";
        List<String> response=placeService.getPlaceImageUrls(placeId);
        System.out.println(response);
    }
//    @Test
//    public void test1() {
//        List<User> userList = mongoTemplate.findAll(User.class);
//        if (userList != null && userList.size() > 0) {
//            userList.forEach(user -> {
//                System.out.println(user.toString());
//            });
//        }
//    }
//    @Test
//    void testInsert(){
//        User user= new User();
//        user.setName("Tuan");
//        user.setEmail("tt123@emory.edu");
//        user.setPassword("123456");
//        user.setCreateDate(new Date());
//        userRepository.save(user);
//    }
//    @Test
//    void testPlaceRefresh() {
//        List<Place> places = placeService.getAllPlaces();
//        for (Place place : places) {
//            util.refreshPlace(place);
//        }
//    }
//    @Test
//    void testTotalRating() {
//        ObjectId id = new ObjectId("65d51531fa7f55b417232cba");
//        Optional<Place> optionalPlace = placeService.findById(id);
//
//        if (optionalPlace.isPresent()) {
//            Place place = optionalPlace.get();
//            Place.TotalRating totalRating = place.getTotalRating();
//            // Perform assertions on totalRating to ensure it's correct
//            // For example:
//
//        }
//    }
//    @Test
//    void deleteUser(){
//        ObjectId id= new ObjectId("65d574294bb7330ced78f1ba");
//        userService.deleteUser(id);
//    }
//    @Test
//    void deletePlace(){
//        ObjectId id= new ObjectId("65de4b11e0e2413bed3f005a");
//        placeService.deletePlace(id);
//    }
//    @Test
//    void findUser(){
//        ObjectId id= new ObjectId("65d574294bb7330ced78f1ba");
//        User user=userService.findUserById(id);
//        System.out.println(user);
//    }
//    @Test
//    void testAverageRating(){
//        List<Place> places = placeService.getAllPlaces();
//        for (Place place : places) {
//            Map<String, Double> averageRatings = placeService.getAverageRatingsMap(place.getLocId());
//            for(String s:averageRatings.keySet()){
//                System.out.println(s+": "+averageRatings.get(s));
//            }
//        }
//    }
//
//
//
//    @Test
//    void TestPlaceGet(){
//        List<Place> places=placeService.getAllPlaces();
//    }
//    @Test
//    void TestRatingGet(){
//        List<Rating> ratings=ratingService.getAllRatings();
//    }
//
//    @Test
//    public void testFloorFilter() {
//        List<Rating> filteredRatings = ratingService.getRatingByFilter(null, 2);
//        // Assert statements or any other validation on the filteredRatings
//    }
//    @Test void commentFilter(){
//        Rating.OverallRating overallRating = new Rating.OverallRating();
//        overallRating.setOverall(4.5);
//        overallRating.setRating1(4.0);
//        overallRating.setRating2(4.5);
//        overallRating.setRating3(5.0);
//
//        int floor = 2;
//        List<Rating> ratings=ratingService.getRatingByFilter(overallRating,floor);
//
//    }
//    @Test
//    void contextLoads() {
//    }

}
