package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.Place;
import com.astar.ratingbackend.Entity.Rating;
import com.astar.ratingbackend.Model.PlaceRepository;
import com.astar.ratingbackend.Service.IPlaceService;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class PlaceServiceImpl implements IPlaceService {
    private final PlaceRepository placeRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private GridFsTemplate gridFsTemplate;
    @Autowired
    private MongoDatabaseFactory mongoDbFactory;
    private GridFSBucket getGridFs() {
        MongoDatabase db = mongoDbFactory.getMongoDatabase();
        return GridFSBuckets.create(db);
    }

    @Autowired
    public PlaceServiceImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }
    /**
     * Adds a new place to the database, setting default values for unspecified fields.
     * @param place The Place entity to be added.
     * @return The saved Place entity.
     */
    public Place addPlace(Place place) {
        if(place.getCampus()==null){
            place.setCampus("Emory-Main");
        }
        place.setAverageRating(new Place.AverageRating(0,0,0,0));
        place.setRatingCount(0);
        place.setTotalRating(new Place.TotalRating(0,0,0,0));
        place.setRatingIds(new ArrayList<String>());
        place.setTags(new LinkedHashMap<String,Integer>());
        place.setVerified(false);
        if(place.getFloor()==null){
            place.setFloor(null);
        }
        if(place.getTags()==null){
            place.setTags(new HashMap<String, Integer>());
        }
        if(place.getImageMap()==null){
            place.setImageMap(new HashMap<String, List<String>>());
        }
        place.setDeleted(false);
        place.setDeletedDate(null);
        return this.mongoTemplate.save(place);

    }
    /**
     * Retrieves a place by its ID.
     * @param id The ObjectId of the place to retrieve.
     * @return An Optional containing the found Place or empty if not found.
     */
    public Optional<Place> findById(ObjectId id) {
        return Optional.ofNullable(this.mongoTemplate.findById(id, Place.class));
    }

    public Place verifyPlace(String id){
        Optional<Place> optionalPlace = findById(new ObjectId(id));
        if(optionalPlace.isPresent()){
            Place place=optionalPlace.get();
            place.setVerified(true);
            return placeRepository.save(place);
        }else{
            throw new IllegalArgumentException("Place with ID " + id + " not found");
        }
    }

    public List<Place> verifyPlaces(List<String> ids){
        List<Place> places=new ArrayList<>();
        for(String id: ids){
            places.add(verifyPlace(id));
        }
        return places;
    }

    public List<Place> findUnverified(String category){
        if (category == null) {
            return placeRepository.findByVerified(false);
        } else {
            return placeRepository.findByCategoryAndVerified(category, false);
        }
    }
    /**
     * Searches for places by name, ignoring case sensitivity.
     * @param name The name to search for in place entities.
     * @return A list of places matching the search criteria.
     */
    @Override
    public List<Place> searchPlacesByName(String name) {
        List<Place> lis= placeRepository.findByLocNameContainingIgnoreCase(name);
        return lis;
    }


    /**
     * Searches for places by name and category, ignoring case sensitivity.
     * @param name The name to search for.
     * @param category The category to filter by.
     * @return A list of places matching the search criteria.
     */
    @Override
    public List<Place> searchPlacesByNameAndCategory(String name, String category) {
        return placeRepository.findByLocNameContainingIgnoreCaseAndCategory(name, category);
    }
    /**
     * Retrieves all places from the database.
     * @return A list of all places.
     */
    public List<Place> getAllPlaces() {
        Query query = new Query();
        query.addCriteria(Criteria.where("verified").is(true));

        // Use the mongoTemplate to find places matching the query
        return this.mongoTemplate.find(query, Place.class);
    }

    /**
     * Updates the details of an existing place.
     * @param id The ObjectId of the place to update.
     * @param placeDetails The updated details of the place.
     * @return The updated Place entity, or null if the place was not found.
     */
    public Place updatePlace(ObjectId id, Place placeDetails) {
        Place existingPlace = placeRepository.findById(id).orElse(null);
        if (existingPlace == null) {
            // Handle case when place is not found
            return null;
        }

        // Update all fields from placeDetails
        existingPlace.setLocName(placeDetails.getLocName());
        existingPlace.setCategory(placeDetails.getCategory());
        existingPlace.setLocation(placeDetails.getLocation());
        existingPlace.setCampus(placeDetails.getCampus());
        existingPlace.setTags(placeDetails.getTags());
        existingPlace.setRatingCount(placeDetails.getRatingCount());
        existingPlace.setRatingIds(placeDetails.getRatingIds());
        existingPlace.setImageMap(placeDetails.getImageMap());
        existingPlace.setTotalRating(placeDetails.getTotalRating());
        existingPlace.setRatingAspect(placeDetails.getRatingAspect());
        existingPlace.setDeletedDate(placeDetails.getDeletedDate());
        existingPlace.setDeleted(placeDetails.isDeleted());
        existingPlace.setAverageRating(placeDetails.getAverageRating());
        // Save the updated place using the repository
        Place updatedPlace = placeRepository.save(existingPlace);
        return updatedPlace;
    }
    /**
     * Removes a rating from a place and updates the total ratings accordingly.
     * @param rating The Rating to be removed.
     */
    public boolean deleteRating(Rating rating) {
        ObjectId id=new ObjectId(rating.getPlaceId());
        Double rating1 = rating.getOverallRating().getRating1();
        Double rating2 = rating.getOverallRating().getRating2();
        Double rating3 = rating.getOverallRating().getRating3();
        Double overall=(rating1+rating2+rating3)/3.0;
        Optional<Place> optionalPlace = this.findById(id);
        if (optionalPlace.isPresent()) {
            Place place = optionalPlace.get();

            if (place.isDeleted()) {
                // Place is already deleted
                return false;
            }

            //update totalRating
            Place.TotalRating totalRatings = place.getTotalRating();
            totalRatings.setOverall(Math.max(totalRatings.getOverall() - overall,0));
            totalRatings.setRating1(totalRatings.getRating1() - rating1);
            totalRatings.setRating2(totalRatings.getRating2() - rating2);
            totalRatings.setRating3(totalRatings.getRating3() - rating3);
            place.setRatingCount(place.getRatingCount()-1);
            place.setTotalRating(totalRatings);
            //update averageRating
            Place.AverageRating averageRating = place.getAverageRating();
            averageRating.setOverall(place.getRatingCount()==0?0:Math.max(0,totalRatings.getOverall()/place.getRatingCount()));
            averageRating.setRating1(place.getRatingCount()==0?0:totalRatings.getRating1()/place.getRatingCount());
            averageRating.setRating2(place.getRatingCount()==0?0:totalRatings.getRating2()/place.getRatingCount());
            averageRating.setRating3(place.getRatingCount()==0?0:totalRatings.getRating3()/place.getRatingCount());
            place.setAverageRating(averageRating);

            String ratingIdString = rating.getRatingId() != null ? rating.getRatingId().toString() : null;
            if (ratingIdString == null) {
                return false; // Rating ID is null, cannot proceed with deletion
            }
            List<String> ratings = new ArrayList<>();
            if (place.getRatingIds() != null) {
               ratings=place.getRatingIds();
            }
            if (!ratings.contains(rating.getRatingId().toString())) {
                // Rating not found in user's ratings array
                return false;
            }
            ratings.remove(rating.getRatingId().toString());
            place.setRatingIds(ratings);

            // Save the updated place object back to the database
            Map<String, List<String>> imageMap = place.getImageMap();
            if (imageMap != null) {
                List<String> imageIds = imageMap.remove(rating.getRatingId().toString());
                // Delete the images using GridFsTemplate
                if (imageIds != null) {
                    for (String imageId : imageIds) {
                        gridFsTemplate.delete(Query.query(Criteria.where("_id").is(imageId)));
                    }
                }
                // Save the updated place
            }
            this.updatePlace(id, place);
            return true; // Place found and updated successfully
        } else {
            return false; // Place not found
        }
    }
    /**
     * Deletes a place from the database by its ID.
     * @param id The ObjectId of the place to delete.
     */
    public void deletePlaceT(ObjectId id) {
        this.placeRepository.deleteById(id);
    }
    /**
     * Marks a place as deleted without actually removing it from the database.
     * @param id The ObjectId of the place to mark as deleted.
     */
    public void deletePlace(ObjectId id) {
        this.placeRepository.findByIdAndNotDeleted(id).ifPresent((place) -> {
            place.setDeleted(true);
            place.setDeletedDate(new Date());
            this.placeRepository.save(place);
        });
    }
    public List<String> deletePlace(String userId, String placeId, boolean trueDelete) {
        Optional<Place> findPlace = findById(new ObjectId(placeId));
        if (!findPlace.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Place not found");
        } else {
            Place place = findPlace.get();
            List<String> ratingIds=place.getRatingIds();
            if (place.isDeleted()) {
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Place is already deleted");
                return ratingIds;
            }
            if(trueDelete){
                deletePlaceT(new ObjectId(placeId));
            }else{
                deletePlace(new ObjectId(placeId));
            }
            return ratingIds;
        }
    }
    /**
     * Adds a rating to a specific place and updates its overall ratings.
     * @param id The ObjectId of the place to rate.
     * @param rating The Rating to add.
     * @return A ResponseEntity containing the updated Place or an error message.
     */
    public ResponseEntity<Place> addRating(String id, Rating rating) {
        ObjectId objectId = new ObjectId(id);
        if(rating.getOverallRating()==null){
            Rating.OverallRating overallRating = new Rating.OverallRating();
            overallRating.setOverall(0.0);
            overallRating.setRating1(0.0); // Set other rating values as needed
            overallRating.setRating2(0.0);
            overallRating.setRating3(0.0);
            rating.setOverallRating(overallRating);
        }
        Place place = this.placeRepository.findById(objectId).orElseThrow(() -> {
            return new IllegalArgumentException("Place not found with id: " + id);
        });
        this.addRatingsAndCount(place, rating);
        this.addTags(place, rating.getTags());
        this.addRatingIds(place,rating.getRatingId().toString());
        Place updatedPlace = this.placeRepository.save(place);
        return ResponseEntity.ok(updatedPlace);
    }
    /**
     * Validates the overall rating object, ensuring that no part of it is null or NaN. If any specific rating
     * component (rating1, rating2, rating3) is null or NaN, it is set to the value of the overall rating.
     * @param overallRating The overall rating object to validate.
     * @throws IllegalArgumentException if the overall rating is null or NaN.
     */
    private void validateOverallRating(Rating.OverallRating overallRating) {
        if (overallRating != null && overallRating.getOverall() != null && !Double.isNaN(overallRating.getOverall())) {
            if (overallRating.getRating1() == null || Double.isNaN(overallRating.getRating1())) {
                overallRating.setRating1(overallRating.getOverall());
            }

            if (overallRating.getRating2() == null || Double.isNaN(overallRating.getRating2())) {
                overallRating.setRating2(overallRating.getOverall());
            }

            if (overallRating.getRating3() == null || Double.isNaN(overallRating.getRating3())) {
                overallRating.setRating3(overallRating.getOverall());
            }

        } else {
            throw new IllegalArgumentException("Overall rating cannot be null or NaN");
        }
    }
    /**
     * Adds specific rating values to a place and updates its total rating accordingly.
     * @param id The ObjectId of the place to add the rating to.
     * @param rating1 The first rating value to add.
     * @param rating2 The second rating value to add.
     * @param rating3 The third rating value to add.
     * @return The updated Place entity with the new ratings added.
     * @throws RuntimeException if the place is not found by the provided id.
     */
    public Place addRatingSpecific(ObjectId id, double rating1, double rating2, double rating3) {
        Place place = this.placeRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + id);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating1 + rating2 + rating3);
        totalRatings.setRating1(totalRatings.getRating1() + rating1);
        totalRatings.setRating2(totalRatings.getRating2() + rating2);
        totalRatings.setRating3(totalRatings.getRating3() + rating3);
        place.setTotalRating(totalRatings);
        int ratingCount = place.getRatingCount();
        Place.AverageRating averageRating=place.getAverageRating();
        averageRating.setRating1(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setRating2(totalRatings.getRating2() / (double)ratingCount);
        averageRating.setRating3(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setOverall(totalRatings.getOverall() / (double)ratingCount);
        place.setAverageRating(averageRating);
        return this.placeRepository.save(place);
    }
    /**
     * Adds a list of tags to a place. If the place already contains tags, the new tags are appended to the existing list.
     * @param place The Place entity to which the tags are added.
     * @param ratingTags The list of tags to add to the place.
     */
     private void addTags(Place place, Map<String, Boolean> ratingTags) {
        Map<String, Integer> existingTags = place.getTags();

        // Iterate over the tags from the rating
        for (Map.Entry<String, Boolean> entry : ratingTags.entrySet()) {
            String tag = entry.getKey();
            boolean present = entry.getValue();
            // Check if the tag already exists in the place tags
            if (existingTags.containsKey(tag)) {
                // Increment the count if the tag is present in the rating
                if (present) {
                    existingTags.put(tag, existingTags.get(tag) + 1);
                }
            } else {
                // Add the tag with count 1 if it doesn't exist
                if (present) {
                    existingTags.put(tag, 1);
                }
            }
        }
        place.setTags(existingTags);
    }
    private void addRatingIds(Place place, String ratingId) {
        List<String> existingIds = place.getRatingIds();
        existingIds.add(ratingId);
        place.setRatingIds(existingIds);
    }
    /**
     * Calculates and returns the average ratings for a place by dividing the total ratings by the number of ratings.
     * @param id The ObjectId of the place for which to calculate the average ratings.
     * @return A map containing the average ratings for each rating aspect.
     * @throws RuntimeException if the place is not found by the provided id.
     */
    public Map<String, Double> getAverageRatings(ObjectId id) {
        Place place = this.placeRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + id);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        Map<String, String> ratingAspect = place.getRatingAspect();
        int ratingCount = place.getRatingCount();
        Map<String, Double> averageRatings = new LinkedHashMap();
        averageRatings.put("overall", totalRatings.getOverall() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating1", "rating1"), totalRatings.getRating1() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating2", "rating2"), totalRatings.getRating2() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating3", "rating3"), totalRatings.getRating3() / (double)ratingCount);
        return averageRatings;
    }

    public Map<String, Double> getAverageRatingsMap(ObjectId id) {
        Place place = this.placeRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + id);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        Map<String, String> ratingAspect = place.getRatingAspect();
        int ratingCount = place.getRatingCount();
        Map<String, Double> averageRatings = new LinkedHashMap();
        averageRatings.put("overall", totalRatings.getOverall() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating1", "rating1"), totalRatings.getRating1() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating2", "rating2"), totalRatings.getRating2() / (double)ratingCount);
        averageRatings.put(ratingAspect.getOrDefault("rating3", "rating3"), totalRatings.getRating3() / (double)ratingCount);
        return averageRatings;
    }
    @Override
    public Place validatePlace(String placeId) {
        ObjectId placeIdObj = new ObjectId(placeId);
        Place place = placeRepository.findByIdAndNotDeleted(placeIdObj)
                .orElseThrow(() -> new IllegalArgumentException("Place not found or deleted with ID: " + placeId));
        return place;
    }

    private void updatePlaceRatings(ObjectId placeId, Rating rating) {
        Place place = this.findById(placeId).orElseThrow(() -> {
            return new RuntimeException("Place not found with id: " + placeId);
        });
        Place.TotalRating totalRatings = place.getTotalRating();
        totalRatings.setOverall(totalRatings.getOverall() + rating.getOverallRating().getOverall());
        totalRatings.setRating1(totalRatings.getRating1() + rating.getOverallRating().getRating1());
        totalRatings.setRating2(totalRatings.getRating2() + rating.getOverallRating().getRating2());
        totalRatings.setRating3(totalRatings.getRating3() + rating.getOverallRating().getRating3());
        place.setTotalRating(totalRatings);
        int ratingCount = place.getRatingCount();
        Place.AverageRating averageRating=place.getAverageRating();
        averageRating.setRating1(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setRating2(totalRatings.getRating2() / (double)ratingCount);
        averageRating.setRating3(totalRatings.getRating1() / (double)ratingCount);
        averageRating.setOverall(totalRatings.getOverall() / (double)ratingCount);
        place.setAverageRating(averageRating);
        this.placeRepository.save(place);
    }
    /**
     * Updates the total ratings and rating count of a place with the values from a new Rating entity.
     * @param place The Place entity to update.
     * @param rating The Rating entity containing the new ratings to add.
     */
    private void addRatingsAndCount(Place place, Rating rating) {
        Place.TotalRating totalRatings = place.getTotalRating();
        Rating.OverallRating overallRating = rating.getOverallRating();

        if (overallRating != null) {
            Double overall = overallRating.getOverall() != null ? overallRating.getOverall() : 0.0;
            Double rating1 = overallRating.getRating1() != null ? overallRating.getRating1() : 0.0;
            Double rating2 = overallRating.getRating2() != null ? overallRating.getRating2() : 0.0;
            Double rating3 = overallRating.getRating3() != null ? overallRating.getRating3() : 0.0;

            totalRatings.setOverall(totalRatings.getOverall() + overall);
            totalRatings.setRating1(totalRatings.getRating1() + rating1);
            totalRatings.setRating2(totalRatings.getRating2() + rating2);
            totalRatings.setRating3(totalRatings.getRating3() + rating3);
            place.setRatingCount(place.getRatingCount() + 1);
            place.setTotalRating(totalRatings);
            int ratingCount = place.getRatingCount();
            Place.AverageRating averageRating = place.getAverageRating();

            averageRating.setRating1(totalRatings.getRating1() / (double) ratingCount);
            averageRating.setRating2(totalRatings.getRating2() / (double) ratingCount);
            averageRating.setRating3(totalRatings.getRating3() / (double) ratingCount);
            averageRating.setOverall(totalRatings.getOverall() / (double) ratingCount);
            place.setAverageRating(averageRating);
            this.placeRepository.save(place);
        } else {
            // Handle the case where overallRating is null
            throw new IllegalArgumentException("Overall rating cannot be null or NaN");
        }
    }
    /**
     * Searches for places containing all specified tags.
     * @param tags The list of tags to search for.
     * @return A list of places containing all the specified tags.
     */
    public List<Place> searchByTagsAndCategory(List<String> tags, String category) {
        Query query = new Query();
        query.addCriteria(Criteria.where("verified").is(true));
        // Create a map to keep track of added tags
        Map<String, Boolean> addedTags = new HashMap<>();

        // Add criteria for each tag in the list
        for (String tag : tags) {
            // Check if the tag has already been added
            if (!addedTags.containsKey(tag)) {
                Criteria criteria = where("tags." + tag).exists(true).gt(0); // Check if the tag exists and its value is greater than 0
                query.addCriteria(criteria);
                addedTags.put(tag, true); // Mark the tag as added
            }
        }

        // Add category criteria if provided
        if (category != null) {
            query.addCriteria(where("category").is(category));
        }

        // Execute the query
        return mongoTemplate.find(query, Place.class);
    }
    /**
     * Searches for places by location name, category, and containing all specified tags, using case-insensitive matching.
     * @param locName The location name to search for.
     * @param category The category of places to search for.
     * @param tags The map of tags each place must contain with their counts.
     * @return A list of places matching all specified criteria.
     */
    public List<Place> searchByLocNameAndCategoryAndTagsAll(String locName, String category, List<String> tags) {

        Query query = new Query();
        query.addCriteria(Criteria.where("verified").is(true));

        if (locName != null) {
            Criteria locNameCriteria = where("locName").regex(locName, "i"); // Case-insensitive regex match for locName
            query.addCriteria(locNameCriteria);
        }

        if (category != null) {
            Criteria categoryCriteria = where("category").regex(category, "i"); // Case-insensitive regex match for category
            query.addCriteria(categoryCriteria);
        }
        if (tags != null) {
            // Create a map to keep track of added tags
            Map<String, Boolean> addedTags = new HashMap<>();

            // Add criteria for each tag in the list
            for (String tag : tags) {
                // Check if the tag has already been added
                if (!addedTags.containsKey(tag)) {
                    Criteria tagCriteria = where("tags." + tag).exists(true).gt(0); // Check if the tag exists and its value is greater than 0
                    query.addCriteria(tagCriteria);
                    addedTags.put(tag, true); // Mark the tag as added
                }
            }
        }
        List<Place> places=mongoTemplate.find(query, Place.class);
        // Execute the query
        return places;
    }

    public void sortRatingsDescending(List<Place> places) {
        Collections.sort(places, new Comparator<Place>() {
            @Override
            public int compare(Place p1, Place p2) {
                return Double.compare(p2.getAverageRating().getOverall(), p1.getAverageRating().getOverall());
            }
        });
    }

    public List<Place> findTopPlaces(int limit) {
        // Ensure the limit is at least 1
        limit = Math.max(5, limit);

        Aggregation aggregation = newAggregation(
                // Match documents where verified is true
                match(where("verified").is(true)),
                // Sort documents by AverageRating.overall in descending order and ratingCount in descending order
                sort(Sort.Direction.DESC, "averageRating.overall", "ratingCount"),
                // Limit the results based on the provided limit
                limit(limit)
        );

        // Execute the aggregation pipeline and retrieve the results
        AggregationResults<Place> results = mongoTemplate.aggregate(aggregation, "Places", Place.class);
        return results.getMappedResults();
    }
    public List<Place> findTopPlaces() {
        return findTopPlaces(8); // Default limit is 9
    }
    public List<String> getPlaceImageUrls(String placeId) {
        Optional<Place> optionalPlace = findById(new ObjectId(placeId));
        if (!optionalPlace.isPresent()) {
            return new ArrayList<>(); // Return empty list if place not found
        }
        Place place = optionalPlace.get();
        Map<String, List<String>> imageMap = place.getImageMap();

        // List to hold image URLs
        List<String> imageUrls = new ArrayList<>();

        // Iterate over the image map
        for (List<String> imageIds : imageMap.values()) {
            for (String imageId : imageIds) {
                // Generate the image URL using the image ID
                String imageUrl = "/api/place/image/" + imageId;
                imageUrls.add(imageUrl);
            }
        }
        return imageUrls;
    }
    public GridFsResource getImageById(String imageId) throws IOException {
        GridFSFile file = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)));
        GridFsResource imageResource =  new GridFsResource(file, getGridFs().openDownloadStream(file.getObjectId()));
        return imageResource;

    }


}

