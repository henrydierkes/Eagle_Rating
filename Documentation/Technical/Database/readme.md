# MongoDB Database Structure Documentation

There are two MongoDB databases: `Forum` and `myDatabase`.

## Database: Forum

## Rationale for the Database Chosen

1. **Schema Flexibility**: As a NoSQL database, MongoDB allows for easier adjustments and evolution of the database structure as the application grows or changes. This flexibility is taken advantage of by our team for `Programs`, `Threads`, and `Replies`, as we do see change in data structures. 

2. **Prevention of SQL Injection**: MongoDB uses BSON (Binary JSON) for data storage and doesn't interpret query input as a part of the code. This feature inherently reduces the risk of SQL injection attacks, which are more prevalent in SQL databases like MySQL. 

3. **Better Handling of Unstructured Text**: MongoDB excels in storing unstructured text data, such as the content in `postData`, `programData`, and `applicationData`. It allows for efficient storage, retrieval, and querying of large text blocks.

### Collections and Their Key Attributes

Note: netID is the key shared across the database so that every user of the application (student, professor, or admin) are uniquely identified. This netID is the same as the Emory University netID. 

1. **ProfessorSample** This constitues 896 entries of Emory University professors and staff in various disciplines. 
   - `_id`: Unique identifier.
   - `Name`: Name of the professor.
   - `Title`: Professional title.
   - `Image`: URL link to the professor's image. Where not applicable, the image will be one of that of an unknown folder. 
   - `Email`: Email address.
   - `Office`: Office location.
   - `BioLink`: URL link to the biography.
   - `Subject`: Teaching subject.
   - `PopupInfo`: Additional contact information.
   - `netID`: Network identifier of the professor.

2. **Applications**
   - `_id`: Unique identifier for the application, created by mongodb.
   - `collectionName`: Stores the name of the collection ("Applications").
   - `netid`: Netid of the applicant.
   - `applicationData`: Contents of the application.
   - `applicationDate`: Timestamp of the application submission.
   - `applicationId`: Unique identifier for each application.
   - `programId`: Identifier for the program applied to (linked to `Programs` collection).
   - `visibility`: Access level of the application. Accessibility includes "protected" to both professors and user, or "private" to only users. 

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
