# Place API Endpoints

This document provides an overview of the API endpoints available in the `PlaceController` class.

## 1. Get All Places

- **Endpoint:** `GET /api/place/get`
- **Description:** Retrieves all places stored in the database.
- **Query Parameter:** `desc` (Boolean, optional) - If `true`, sorts the places by ratings in descending order.
- **Response:** A list of all places.

## 2. Add Place

- **Endpoint:** `POST /api/place/add`
- **Description:** Adds a new place to the database.
- **Request Body:** A JSON object representing the `AddPlaceRequest` entity.
- **Response:** A `ResponseEntity` containing the added place.

## 3. Get Unverified Places

- **Endpoint:** `GET /api/place/places/getUnverified`
- **Description:** Retrieves a list of unverified places.
- **Query Parameter:** `category` (String, optional) - Filters places by category.
- **Response:** A `ResponseEntity` containing a list of unverified places.

## 4. Verify Places

- **Endpoint:** `POST /api/place/places/verifyPlaces`
- **Description:** Verifies multiple places.
- **Request Parameter:** `ids` (List of Strings) - The list of place IDs to verify.
- **Response:** A `ResponseEntity` containing a list of verified places.

## 5. Verify Place

- **Endpoint:** `POST /api/place/places/verifyPlace`
- **Description:** Verifies a specific place by ID.
- **Request Parameter:** `id` (String) - The ID of the place to verify.
- **Response:** A `ResponseEntity` containing the verified place.

## 6. Delete Place

- **Endpoint:** `POST /api/place/delete`
- **Description:** Deletes a place by user ID and place ID.
- **Query Parameters:**
    - `userId` (String) - The user ID.
    - `placeId` (String) - The place ID.
    - `trueDelete` (Boolean, optional) - If `true`, performs hard delete; otherwise, soft delete.
- **Response:** A `ResponseEntity` indicating the operation's outcome.

## 7. Search Places

- **Endpoint:** `GET /api/place/search`
- **Description:** Searches for places based on location name, category, and tags.
- **Query Parameters:**
    - `locName` (String, optional) - Location name.
    - `category` (String, optional) - Place category.
    - `tags` (List of Strings, optional) - Tags to filter places.
    - `desc` (Boolean, optional) - If `true`, sorts places by ratings in descending order.
- **Response:** A list of places that match the search criteria.

## 8. Get Place Images

- **Endpoint:** `GET /api/place/{placeId}/images`
- **Description:** Retrieves the list of image URLs for a given place ID.
- **Path Variable:** `placeId` (String) - The ID of the place.
- **Response:** A `ResponseEntity` containing a list of image URLs.

## 9. Get Image

- **Endpoint:** `GET /api/place/image/{imageId}`
- **Description:** Retrieves a specific image by its ID.
- **Path Variable:** `imageId` (String) - The ID of the image.
- **Response:** A `ResponseEntity` containing the image data.

## 10. Get Place by ID

- **Endpoint:** `GET /api/place/{id}`
- **Description:** Retrieves a specific place by its ID.
- **Path Variable:** `id` (String) - The ID of the place.
- **Response:** A `ResponseEntity` containing the place if found, or `not found` if not.

## 11. Get Trendy Places

- **Endpoint:** `GET /api/place/getTrendy`
- **Description:** Retrieves a list of top-rated places.
- **Query Parameter:** `num` (Integer, optional) - Number of top-rated places to retrieve.
- **Response:** A list of top-rated places.
