# Profile Page
The `Profile` page is designed to allow users to change their avatar, username, and password all on one page. 

## Profile Page Structure

The `Profile` page is structured in a straightforward layout that consists of a navigation bar, the main section where you can update your information, and a footer. Here's an outline of the page structure and the key components:

## Page Layout

1. **Navigation Bar**
    - `NavBar`: At the top of the page, the navigation bar component provides navigation options and links to other parts of the application.

2. **Main Content: Update Section**
    - The Update Section encompasses the entire main content of the page. It includes:
    
        - **Avatar and Username**: Users can see their avatar and username. 
        - **Change Avatar**: Users can upload an image less than 5 megabytes and use it as their avatar that appears next to their name in comments they make. 
        - **Change Username**: Users can change their username here and this will be what appears as their name in comments. 
        - **Change Password**: Users can change their password here. 
    
    - **Form Elements**:
        - `Upload Avatar`: Allows users to upload and avatar and see a small preview. 
        - `Save Avatar`: This saves the avatar into the database under the user. 
        - `Change Username`: If the above text box is filled in then this button will put what is in that text box into the user's username. 
        - `Change Password`: If the above two text boxes are the same then this button will change the user's password to that. 

3. **Footer**
    - `Footer`: At the bottom of the page, the footer component includes links and additional information about the application.

## Page Interaction Flow
1. **Navigate to Profile Page**:
   - Users arrive at the `Profile` page by clicking their name in the top left of the `NavBar`.
   
2. **Update Information**:
    - The users can update any information about their profile from this page. 

This page structure ensures a seamless and user-friendly experience for updating your profile information.

##  Methods

- **fetchUserProfile()**:
    - **Purpose**: Gathers relevant information for the page to display, such as the user's avatar. 

- **handleAvatarChange(event)**
    - **Purpose**: Manages uploaded avatar, validating file size and updating the state with allowed files.
    - **Input**: `event` - The file selection event.

- **handleUsernameChange()**
    - **Purpose**: To update the user's username with their new username. 

- **handlePasswordChange()**
    - **Purpose**: To update the user's password with their new username. 

- **handleUploadAvatar()**
    - **Purpose**: Uploads the avatar to the backend so it can be sent to the database, then refreshes the page so the new avatar can be shown. 

## Dependencies

- `React` and related hooks (`useState`, `useNavigate`).
- `axios` for API requests.
- `@mui/material` components for form inputs and styling.
- Other dependencies such as `useAuth` and relevant styles and assets.

## Usage

- Users can interact with the page to change their avatar, username, and password. 
- Upon clicking one of the submission buttons, the relevant data is sent to the backend API for processing and storage.
