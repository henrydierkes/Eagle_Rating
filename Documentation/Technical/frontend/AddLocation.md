# AddLocation

The `AddLocation` page is designed to allow users to add new locations with associated data such as category, name, ratings, tags, comments, and images. This page facilitates the process of collecting detailed information about a specific location, enabling users to share their experiences and provide valuable feedback for others.

## Page Structure

1. **Navigation Bar**:
    - The `NavBar` component is located at the top of the page and provides navigation options for users.

2. **LocationForm**:
    - The primary section of the page consists of the `LocationForm` component, which encompasses the main content of the page and includes:
        - **Category Selection**: Users can select a category for the location, such as Bathroom, Building, Dorm, Parking Lot, or Study Space.
        - **Place Name and Location Selection**: Users can input the name of the place and select its location on a map using the `Map` component.
        - **Floor Number**: Users can input the floor number of the place if applicable.
        - **Ratings**: Users can provide an overall rating or specific subratings (e.g. cleanliness, accessibility) based on the category selected.
        - **Tag Selection**: Users can choose tags to categorize their experience or the characteristics of the place.
        - **Comments**: Users can add comments about the location, sharing additional details and feedback.
        - **Image Upload**: Users can upload one or more images related to the place.
        - **Form Submission**: A button allows users to submit the data entered in the form.

3. **Footer**:
    - The `Footer` component is placed at the bottom of the page and may contain additional information or links.

## Functionality

- **Overall and Subratings**: Users can provide an overall rating or specific subratings (e.g. cleanliness, accessibility) based on the category selected.
- **Tag Selection**: Users can select predefined tags that best describe their experience with the location.
- **Comments**: Users can share comments providing more context and feedback on the location.
- **Image Upload**: Users can upload multiple images of the location.
- **Form Submission**: Users can submit the form to save their rating, comments, tags, and images.

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

## Usage

- Import the `LocationForm` component into your application and include it in the desired page layout.
- Users can interact with the form to add a new location, providing data such as ratings, tags, comments, and images.
- Upon form submission, the data is sent to the backend API for processing and storage.
