# User API Endpoints

This document provides an overview of the API endpoints available in the `UserController` and `AuthController` classes.

## UserController Endpoints

### 1. Get All Users

- **Endpoint:** `GET /api/user/getAll`
- **Description:** Retrieves all users from the database.
- **Response:** A list of all users.

### 2. Get User by ID

- **Endpoint:** `GET /api/user/get`
- **Description:** Retrieves a specific user by their ID.
- **Query Parameter:** `userID` (String) - The ID of the user to retrieve.
- **Response:** The user matching the provided ID.

### 3. Get User Avatar

- **Endpoint:** `GET /api/user/avatar/{userId}`
- **Description:** Retrieves the avatar of a user by user ID.
- **Path Variable:** `userId` (String) - The ID of the user whose avatar is to be retrieved.
- **Response:** ResponseEntity with the avatar image data and appropriate content type.

### 4. Add User

- **Endpoint:** `POST /api/user/add`
- **Description:** Adds a new user to the database.
- **Request Body:** A JSON object representing the user entity to be added.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 5. Register User

- **Endpoint:** `POST /api/user/register`
- **Description:** Registers a new user. This might include additional logic specific to registration.
- **Request Body:** A JSON object representing the user entity to register.
- **Response:** A ResponseEntity indicating the outcome of the registration, with a message.

### 6. Delete User (Soft Delete)

- **Endpoint:** `DELETE /api/user/delete`
- **Description:** Soft deletes a user by their ID.
- **Query Parameter:** `userId` (String) - The ID of the user to delete.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 7. Delete User (Hard Delete)

- **Endpoint:** `DELETE /api/user/deleteT`
- **Description:** Hard deletes a user by their ID.
- **Query Parameter:** `userId` (String) - The ID of the user to delete.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 8. Get User by Email

- **Endpoint:** `GET /api/user/getByEmail`
- **Description:** Finds a user by their email.
- **Query Parameter:** `email` (String) - The email of the user to find.
- **Response:** A ResponseEntity with the user information if found, or an error message if not found.

### 9. Update Username

- **Endpoint:** `POST /api/user/updateUsername`
- **Description:** Updates the username of a user.
- **Query Parameters:**
    - `userId` (String) - The ID of the user to update.
    - `newUsername` (String) - The new username to set.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 10. Update Password

- **Endpoint:** `POST /api/user/updatePassword`
- **Description:** Updates the password of a user.
- **Query Parameters:**
    - `userId` (String) - The ID of the user to update.
    - `newPassword` (String) - The new password to set.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 11. Upload Avatar

- **Endpoint:** `POST /api/user/uploadAvatar`
- **Description:** Uploads a user's avatar.
- **Query Parameters:**
    - `userId` (String) - The ID of the user.
    - `avatar` (MultipartFile) - The avatar file to upload.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 12. Verify User

- **Endpoint:** `POST /api/user/verify`
- **Description:** Verifies a user using an email and code.
- **Request Body:** A JSON object containing the `VerificationRequest`.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 13. Click Bookmark

- **Endpoint:** `POST /api/user/clickBookMark`
- **Description:** Adds or removes a bookmark for a user.
- **Query Parameters:**
    - `userId` (String) - The ID of the user.
    - `placeId` (String) - The ID of the place to bookmark.
- **Response:** A ResponseEntity indicating the operation's outcome, with a message.

### 14. Get User Bookmarks

- **Endpoint:** `GET /api/user/bookmarks/{userId}`
- **Description:** Retrieves the bookmarked places array of a user by user ID.
- **Path Variable:** `userId` (String) - The ID of the user.
- **Response:** ResponseEntity with the bookmarked places array or an error message if it fails.

## AuthController Endpoints

### 1. Sign Up

- **Endpoint:** `POST /auth/sign-up`
- **Description:** Registers a new user.
- **Request Body:** A JSON object representing the user entity to sign up.
- **Response:** A ResponseEntity with the user entity if successful.

### 2. Sign In

- **Endpoint:** `POST /auth/sign-in`
- **Description:** Authenticates a user and returns a token or other identifier.
- **Request Body:** A JSON object with the user's email and password.
- **Response:** A ResponseEntity with the authentication token or identifier if successful.

