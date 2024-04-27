# MongoDB Database Structure Documentation

There are two MongoDB databases: `Forum` and `myDatabase`.

## Database: EagleRating

## Rationale for the Database Chosen

1. **Schema Flexibility**: As a NoSQL database, MongoDB allows for easier adjustments and evolution of the database structure as the application grows or changes. This flexibility is taken advantage of by our team for `Programs`, `Threads`, and `Replies`, as we do see change in data structures. 

2. **Prevention of SQL Injection**: MongoDB uses BSON (Binary JSON) for data storage and doesn't interpret query input as a part of the code. This feature inherently reduces the risk of SQL injection attacks, which are more prevalent in SQL databases like MySQL. 

3. **Better Handling of Unstructured Text**: MongoDB excels in storing unstructured text data, such as the content in `postData`, `programData`, and `applicationData`. It allows for efficient storage, retrieval, and querying of large text blocks.

### Collections and Their Key Attributes

1. **Places** 
   - `_id`: Unique identifier.
   - `locIdStr`: String version of `_id`.
   - `locName`: Name of the place.
   - `category`: Category of the place.
   - `floor`: floor where this place is located. Only useful when rating study space and bathroom.
   - `campus`: Campus where the place is located. Currently not used but plan to develop further in the future to incorporate cross-campus function.
   - `ratingIds`: A list that records the ratingIds of ratings on the place.
   - `ratingCount`: number of ratings on this place.
   - `tags`:A Map that records the number of occurences of each tag in rating.
   - `ImageMap`: A Map that record ratingId:imageId of image in a specific rating on this place. The imageId is used to fetch image from fs.files and fs.chunks database, maintained by mongodb's GridFS.
   - `totalRating`: A Map of total points a place get for overall rating and each sub-rating.
   - `averageRating`: A Map of average points a place get for overall rating and each sub-rating.
   - `isDeleted`: An indicator of soft delete: whether the place is deleted softly.
   - `verified`: Whether this place is verified to be seen from user.

2. **Ratings** 
   - `_id`: Unique identifier.
   - `ratingIdStr`: String version of `_id`.
   - `userId`: String of userId of the rating
   - `placeId`: String of the placeId of the rating
   - `tags`: A list that records the existence of tags of this rating on a place.
   - `comment`: Comment from user.
   - `date`: Date this rating is posted.
   - `floor`: floor where this place is located. Only useful when rating study space and bathroom.
   - `likes`: the list of userIds that like this rating.
   - `dislikes`: the list of userIds that dislike this rating.
   - `likesNum`: the number of users that like this rating.
   - `dislikeNum`: the number of users that dislike this rating.
   - `overallRating`: A Map of points this rating gives for overall rating and each sub-rating.
   - `ImageIds`: A list of imageIds of images in this rating.
   - `isDeleted`: An indicator of soft delete: whether the place is deleted softly.

3. **User** 
   - `_id`: Unique identifier.
   - `userIdStr`: String version of `_id`.
   - `username`: username of the user, by default the email.
   - `email`: Emory email of the user
   - `password`: encoded password of user.
   - `avatar`: url of user's avatar
   - `ratings`: A list that records the ratingIds made by user.
   - `bookmarks`: A list that records the placeId bookmarked by user.
   - `isDeleted`: An indicator of soft delete: whether the place is deleted softly.
   - `isVerified`: Whether this user is verified.

3. **Programs**
   - `_id`: Unique identifier for each program.
   - `netid`: Netid of the program creator.
   - `programId`: Unique identifier for each program. (linked to `Applications` collection).
   - `programData`: Description or content of the program.
   - `programDate`: Creation date of the program.
   - `collectionName`: Name of the collection ("Programs").

4. **Replies**
   - `_id`: Unique identifier.
   - `collectionName`: Name of the collection ("Replies").
   - `netid`: Netid of the person replying.
   - `replycontent`: Content of the reply.
   - `replydate`: Date of the reply.
   - `replyid`: Unique identifier for the reply.
   - `postid`: Identifier for the post being replied to (linked to `Threads` collection).

5. **Threads**
   - `_id`: Unique identifier.
   - `netid`: Netid of the thread creator.
   - `postid`: Unique identifier for each post.
   - `postData`: Content of the post.
   - `postDate`: Date of the post creation.
   - `collectionName`: Name of the collection ("Threads").
   - `visibility`: Access level of the thread. Public is available to all users, including guests. Protected is available to professors only. Private is available to user only.

6. **Users**
   - `_id`: Unique identifier.
   - `collectionName`: Name of the collection ("Users"). This just simplifies the lookup.
   - `name`: Name of the user.
   - `role`: Role of the user (e.g., Student).
   - `email`: Email address.
   - `year`: Academic year.
   - `major`: Major subject.
   - `courses`: List of courses taken.
   - `bio`: Short biography.
   - `netId`: Netid of the user. This is the key that is used across the database. 

## Database: myDatabase

1. **contactCollection**
   - `field1`: Name
   - `field2`: Email of the person initiating the request.
   - `field3`: Subject of the query
   - `field4`: The content of the query.

2. **myCollection**
   - `field1`: netid (case sensitive)
   - `field2`: hashed password
   - `status`: whether the verified or not. A new user may not get that attribute at all, and that's thanks to mongodb we can extend the visibility fast.

3. **news**
   - `id, title, author, date, description, imageUrl`: static fields for the news information. This is a learning stage at which we create this database to understand the logic of fetching new data from an online connection.

4. **verify**
   - Stores verification codes.
   - Key Attributes:
     - `_id`: Unique identifier.
     - `user`: Username or user identifier.
     - `code`: Verification code.
   - Operational Logic:
     - When a matching code is found, the relevant document in the `verify` collection is deleted, completing the verification process. When that wasn't deleted, it reminds the user to check for the verification code until it is completed. This prevents possible spams and misuse of our precious `email.js` database. 
