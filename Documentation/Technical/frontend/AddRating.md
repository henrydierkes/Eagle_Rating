# AddRating Page
- `NavBar`: A navigation bar that is included at the top of the form.
- `Footer`: A footer included at the bottom of the form.
- `RatingForm`:a React-based form that provides a user interface for submitting ratings and reviews for a specific place. It is designed to interact with an API to submit user-generated ratings, comments, tags, and images associated with a particular location.
- RatingForm will be introduced below
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

