# Rating API Endpoints

This document provides an overview of the API endpoints available in the `RatingController` class.

## 1. Get All Ratings

- **Endpoint:** `GET /api/rating/getAll`
- **Description:** Retrieves all ratings from the database.
- **Query Parameter:** `desc` (Boolean, optional) - If `true`, retrieves the ratings in descending order.
- **Response:** A list of all ratings.

## 2. Get Rating by ID

- **Endpoint:** `GET /api/rating/get`
- **Description:** Retrieves a specific rating by its ID.
- **Query Parameter:** `ratingId` (String) - The ID of the rating to retrieve.
- **Response:** A `ResponseEntity` containing the found rating or a `not found` status.

## 3. Like/Dislike Rating

- **Endpoint:** `POST /api/rating/like`
- **Description:** Adds a like or dislike to a rating.
- **Query Parameters:**
    - `userId` (String) - The ID of the user.
    - `ratingId` (String) - The ID of the rating.
    - `like` (Boolean) - `true` to like the rating; `false` to dislike.
- **Response:** A `ResponseEntity` containing the updated rating.

## 4. Check If User Liked Rating

- **Endpoint:** `GET /api/rating/isLike`
- **Description:** Checks if a user has liked a specific rating.
- **Query Parameters:**
    - `userId` (String) - The ID of the user.
    - `ratingId` (String) - The ID of the rating.
- **Response:** An integer representing whether the user liked the rating (`1` for like, `0` for neutral, `-1` for dislike).

## 5. Delete Rating

- **Endpoint:** `DELETE /api/rating/delete`
- **Description:** Deletes a specific rating by its ID.
- **Query Parameters:**
    - `ratingId` (String) - The ID of the rating to delete.
    - `trueDelete` (Boolean, optional) - If `true`, performs a hard delete; otherwise, a soft delete.
- **Response:** A `ResponseEntity` indicating the outcome of the operation.

## 6. Add Rating

- **Endpoint:** `POST /api/rating/addRating`
- **Description:** Adds a new rating to the database.
- **Request Body:** A JSON object representing the `Rating` entity.
- **Response:** A `ResponseEntity` containing the created rating ID or an error status.

## 7. Upload Images

- **Endpoint:** `POST /api/rating/uploadImage`
- **Description:** Uploads images related to a rating.
- **Query Parameter:** `ratingId` (String) - The ID of the rating to associate the images with.
- **Request Parameter:** `images` (Array of `MultipartFile`) - The array of images to upload.
- **Response:** A `ResponseEntity` with a success or error message.

## 8. Filter Ratings

- **Endpoint:** `POST /api/rating/filter`
- **Description:** Retrieves ratings that match specific filter criteria.
- **Request Body:** A JSON object representing the `CommentFilterRequest` entity with the filter criteria for ratings.
- **Response:** A list of ratings that match the filter criteria.

## 9. Check if User Has Rated a Place

- **Endpoint:** `GET /api/rating/userHasRated`
- **Description:** Checks if a user has rated a specific place.
- **Query Parameters:**
    - `userId` (String) - The ID of the user.
    - `placeId` (String) - The ID of the place.
- **Response:** A `ResponseEntity` containing either the found rating or an indication that the user hasn't rated the place.

