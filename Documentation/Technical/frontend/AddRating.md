# AddRating Page
The `AddRating` page is designed to allow users to add new ratings for existing locations with associated data such as overall and sub-ratings, comments, and tags. This page facilitates the process of collecting detailed feedback about a specific location, enabling users to share their experiences and provide valuable insights for others.

## AddRating Page Structure

The `AddRating` page is structured in a straightforward layout that consists of a navigation bar, the main form, and a footer. Here's an outline of the page structure and the key components:

## Page Layout

1. **Navigation Bar**
    - `NavBar`: At the top of the page, the navigation bar component provides navigation options and links to other parts of the application.

2. **Main Content: Rating Form**
    - The `RatingForm` component encompasses the entire main content of the page. It includes:
    
        - **Rating Selection**: Users can select between providing an overall rating or specific subratings (e.g. cleanliness, accessibility).
        - **Tag Selection**: Users can choose from predefined tags to categorize their experience (e.g. water fountain, charging port).
        - **Commenting**: A text field for users to input comments about the place they are rating.
        - **Image Upload**: An area for users to upload multiple images related to the place.
        - **Form Submission**: A submit button to send the rating, comments, tags, and images to the backend API.
    
    - **Form Elements**:
        - `ToggleButtonGroup`: Allows users to toggle between overall rating and subrating options.
        - `Rating`: Material-UI component for capturing user ratings (either overall or specific subratings).
        - `TextField`: Material-UI component for entering user comments.
        - `FormControl`, `Select`, `InputLabel`, `MenuItem`, `Checkbox`: Material-UI components for handling tag selection.
        - `OutlinedInput`: Material-UI component for handling tag inputs.
        - `Upload Input`: Allows users to select and upload image files.

3. **Footer**
    - `Footer`: At the bottom of the page, the footer component may include links or additional information about the application.

## Page Interaction Flow
1. **Navigate to AddRating Page**:
   - Users arrive at the `AddRating` page and see the `NavBar` at the top.
   - 
2. **Provide Ratings**:
    - The user can provide an overall rating or specific sub-ratings based on the selected category.
    - Ratings may include aspects such as cleanliness, accessibility, safety, and other relevant criteria.

3. **Select Tags**:
    - The user can select predefined tags that describe the location, experience, or characteristics.
    - Tags may include options such as water fountain, charging port, quiet zone, etc.

4. **Add Comments**:
    - The user can input comments about the location to provide additional context and feedback.

5. **Upload Images**:
    - The user can upload one or more images related to the location.
    - Images can be in various formats such as JPG or PNG.

6. **Review and Submit Form**:
    - The user reviews the entered information and ensures it is accurate and complete.
    - The user clicks the "Submit" button to submit the form data to the backend API.
7. **Form Submission and Feedback**:
   - The user reviews will be posted and receive feedback from other users.

This page structure ensures a seamless and user-friendly experience for submitting ratings and reviews for a specific place.

# RatingForm
## Functionalities

- **Rating Selection**: Users can choose between providing an overall rating or specific subratings for various aspects of the place.
- **Tag Selection**: Users can select from predefined tags to categorize their experience.
- **Commenting**: Users can add text comments about their experience.
- **Image Upload**: Users can upload multiple images related to the place they are rating.
- **Form Submission**: Users can submit their ratings, tags, comments, and images via a form.

## Included Components

- `NavBar`: A navigation bar that is included at the top of the form.
- `Footer`: A footer included at the bottom of the form.
- `Rating`: A Material-UI component for capturing user ratings.
- `TextField`: A Material-UI component for inputting user comments.
- `Select`: A Material-UI component for selecting tags.
- `FormControl`, `InputLabel`, `OutlinedInput`, `MenuItem`, `Checkbox`: Material-UI components for handling tag selection.

## Functions

### `handleRatingChange(name, newValue)`
- **Purpose**: Updates the form data state with the new rating value.
- **Input**: `name` (string) - The name of the rating field; `newValue` (number) - The new value of the rating.

### `handleImageChange(event)`
- **Purpose**: Manages uploaded images, validating file size and updating the state with allowed files.
- **Input**: `event` - The file selection event.

### `handleTagsChange(event)`
- **Purpose**: Handles changes in the selected tags and updates the state.
- **Input**: `event` - The tag selection event.

### `handleSubmit(event)`
- **Purpose**: Manages form submission, including validation and sending data to the backend API.
- **Input**: `event` - The form submission event.

### `createRatingRequest()`
- **Purpose**: Creates a rating request object from the form data.
- **Output**: An object containing the rating request data.

### `checkExistingRating(token)`
- **Purpose**: Checks if the user has already rated the place.
- **Input**: `token` (string) - Authentication token.
- **Output**: Returns the existing rating ID if it exists, otherwise null.

### `deleteExistingRating(token, ratingId)`
- **Purpose**: Deletes an existing rating for a given place.
- **Input**: `token` (string) - Authentication token; `ratingId` (string) - ID of the existing rating.

### `submitRating(token, ratingRequest)`
- **Purpose**: Submits the rating request data to the backend API.
- **Input**: `token` (string) - Authentication token; `ratingRequest` (object) - Rating request data.
- **Output**: Returns the ID of the newly submitted rating.

### `uploadImages(ratingId, images, token)`
- **Purpose**: Uploads images associated with the rating to the backend API.
- **Input**: `ratingId` (string) - ID of the rating; `images` (array) - Array of image files; `token` (string) - Authentication token.

## Dependencies

- `React` and related hooks (`useState`, `useNavigate`, `useLocation`).
- `axios` for API requests.
- `@mui/material` components for form inputs and styling.
- `js-cookie` for handling authentication cookies.
- Other dependencies such as `useAuth`, `SubratingData`, and relevant styles and assets.

## Usage

- Import the `RatingForm` component into your application and include it in the desired page layout.
- Users can interact with the form to add a new rating for a place, providing data such as ratings, tags, comments, and images.
- Upon form submission, the data is sent to the backend API for processing and storage.
