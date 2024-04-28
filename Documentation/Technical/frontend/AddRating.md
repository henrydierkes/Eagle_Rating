# AddRating Page

## AddRating Page Structure

The `RatingForm` page is structured in a straightforward layout that consists of a navigation bar, the main form, and a footer. Here's an outline of the page structure and the key components:

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

1. Users arrive at the `RatingForm` page and see the `NavBar` at the top.
2. In the `RatingForm` section, users can:
    - Choose to provide an overall rating or specific subratings.
    - Select tags to categorize their experience.
    - Add comments about the place.
    - Upload images related to the place.
3. After completing the form, users can submit their input using the submit button.
4. The `Footer` is displayed at the bottom of the page for additional information.

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

