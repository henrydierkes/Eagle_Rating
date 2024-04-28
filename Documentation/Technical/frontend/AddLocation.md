# AddLocation

The `AddLocation` page is designed to allow users to add new locations with associated data such as category, name, ratings, tags, comments, and images. This page facilitates the process of collecting detailed information about a specific location, enabling users to share their experiences and provide valuable feedback to others.

## AddLocation Page Structure

The `AddLocation` page is structured in a straightforward layout that consists of a navigation bar, the main form, and a footer. Here's an outline of the page structure and the key components:

## Page Structure

1. **Navigation Bar**:
    - The `NavBar` component is located at the top of the page and provides navigation options for users.

2. **Main Content: LocationForm**:
    - The primary section of the page consists of the `LocationForm` component, which encompasses the main content of the page and includes:
        - **Category Selection**: Users can select a category for the location, such as Bathroom, Building, Dorm, Parking Lot, or Study Space.
        - **Place Name and Location Selection**: Users can input the location's name and select its location on a map using the `Map` component.
        - **Floor Number**: Users can input the floor number of the place if applicable.
        - **Ratings**: Users can provide an overall rating or specific sub-ratings (e.g. cleanliness, accessibility) based on the category selected.
        - **Tag Selection**: Users can choose tags to categorize their experience or the characteristics of the place.
        - **Comments**: Users can add comments about the location, sharing additional details and feedback.
        - **Image Upload**: Users can upload one or more images related to the place.
        - **Form Submission**: A button allows users to submit the data entered in the form.
    - **Form Elements**:
        - `TextField`:A Material-UI component for entering the location's name, floor number (if applicable), and user comment.
        - `AutoComplete`: Used for selecting the category of the location from a predefined list of categories.
        - `Map`: An interactive map interface that allows users to select and mark the location's geographic position.
        - `ToggleButtonGroup`: Allows users to toggle between overall rating and sub-ratings options.
        - `Rating`: Material-UI component for capturing user ratings (either overall or specific sub-ratings).
        - `FormControl`, `Select`, `InputLabel`, `MenuItem`, `Checkbox`: Material-UI components for handling tag selection and creating a dropdown list of available tags.
        - `OutlinedInput`: Used for handling tag inputs and managing the selected tags.
        - `Upload Input`: Allows users to select and upload image files for the location.


3. **Footer**:
    - The `Footer` component is placed at the bottom of the page and may contain additional information or links.
   
## Page Interaction Flow

1. **Navigate to AddLocation Page**:
    - The user navigates to the `AddLocation` page via the navigation bar or a link within the application.

2. **Select Category**:
    - The user selects a category for the location from a dropdown list.
    - Possible categories may include Bathroom, Building, Dorm, Parking Lot, or Study Space.

3. **Input Place Name and Select Location**:
    - The user inputs the name of the place in the designated text field.
    - The user need to select the location on a map using the `Map` component.

4. **Input Floor Number** (if applicable):
    - If the location has a specific floor, the user can input the floor number in the designated text field.

5. **Provide Ratings**:
    - The user can provide an overall rating or specific sub-ratings based on the selected category.
    - Ratings may include aspects such as cleanliness, accessibility, safety, and other relevant criteria.

6. **Select Tags**:
    - The user can select predefined tags that describe the location, experience, or characteristics.
    - Tags may include options such as water fountain, charging port, quiet zone, etc.

7. **Add Comments**:
    - The user can input comments about the location to provide additional context and feedback.

8. **Upload Images**:
    - The user can upload one or more images related to the location.
    - Images can be in various formats such as JPG or PNG.

9. **Review and Submit Form**:
    - The user reviews the entered information and ensures it is accurate and complete.
    - The user clicks the "Submit" button to submit the form data to the backend API.

10. **Form Submission and Feedback**:
    - The form data is sent to the backend API for processing and storage. The added Place will be verified by the administrator and then shown on the website.
   
This page structure ensures a seamless and user-friendly experience for adding a specific place.

## Included Components

- `NavBar`: A navigation bar that is included at the top of the page.
- `Footer`: A footer included at the bottom of the page.
- `TextField`: A Material-UI component for inputting the name of the location and the floor number.
- `Autocomplete`: Material-UI component for selecting a category from a predefined list.
- `Map`: An interactive map interface that allows users to select and mark the location's geographic position.
- `ToggleButtonGroup`: Allows users to toggle between overall rating and subrating options.
- `Rating`: Material-UI component for capturing user ratings (either overall or specific sub-ratings).
- `TextField`: Material-UI component for entering user comments.
- `FormControl`, `Select`, `InputLabel`, `MenuItem`, `Checkbox`: Material-UI components for handling tag selection and creating a dropdown list of available tags.
- `OutlinedInput`: Material-UI component for handling tag inputs and managing selected tags.
- `Upload Input`: Allows users to select and upload image files related to the location.

  
# RatingForm
## Functionality

- **Category Selection**: Users need to provide a category of the place they want to add.
- **Name Input**: Users need to input the location they want to add.
- **Location Selection**: Users need to select the location on the embedded Google Map.
- **Overall and Subratings**: Users can provide an overall rating or specific subratings (e.g. cleanliness, accessibility) based on the category selected.
- **Tag Selection**: Users can select predefined tags that best describe their experience with the location.
- **Comments**: Users can share comments providing more context and feedback on the location.
- **Image Upload**: Users can upload multiple images of the location.
- **Form Submission**: Users can submit the form to save their ratings, comments, tags, and images.


## Methods

- **handleInputChange**:
    - **Purpose**: Handles changes to form inputs and updates the state of the form data.
    - **Input**: An event object representing a change in the form input.
    - **Output**: Updates the form state with the new input value.

- **handleCategoryChange**:
    - **Purpose**: Updates the selected category in the form state when a change event occurs.
    - **Input**: An event object representing the change event.
    - **Output**: Updates the `formData` state with the new category.

- **handleRatingChange**:
    - **Purpose**: Handles changes to the rating input and updates the form state.
    - **Input**: The name of the rating field and the new rating value.
    - **Output**: Updates the form data state with the new rating value.

- **handleTagsChange**:
    - **Purpose**: Handles changes to tag selections and updates the form state.
    - **Input**: An event object representing the change event in tag selection.
    - **Output**: Updates the form data state with the new tag selections.

- **handleImageChange**:
    - **Purpose**: Handles image file uploads and updates the form state with the uploaded images.
    - **Input**: An event object representing a change in the file input.
    - **Output**: Updates the form data state with the base64-encoded images.

- **handleSubmit**:
    - **Purpose**: Handles form submission by preparing the form data and making an API request to submit the rating and review.
    - **Input**: A form submission event object.
    - **Output**: Sends a POST request to the backend API with the prepared form data, and handles success or error responses.

## Dependencies
- `React` and related hooks (`useState`, `useEffect`).
- `@mui/material` components for form inputs and styling (`TextField`, `Select`, `MenuItem`, `InputLabel`, `FormControl`, `Checkbox`, `Button`).
- `react-router-dom` for navigation and route management.
- `axios` for making API requests.
- `Google Maps` API or similar library for location selection on a map.
- `js-cookie` for handling authentication cookies.
- Other dependencies such as useAuth, LocationData, and relevant styles and assets.

  
## Usage

- Import the `LocationForm` component into your application and include it in the desired page layout.
- Users can interact with the form to add a new location, providing data such as ratings, tags, comments, and images.
- Upon form submission, the data is sent to the backend API for processing and storage.
