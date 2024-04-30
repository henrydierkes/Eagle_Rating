# RatingPage Component

The `RatingPage` is the main page for displaying place details, comments, and ratings. It manages the state for place details and comments, handles asynchronous data fetching, and updates based on user interaction.

## RatingPage Structure

### 1. Navigation Bar:
- **NavBar**: Located at the top, it facilitates navigation throughout the application, helping users move between different pages easily.

### 2. Place Details Section:
- **PlaceDetails**: Displays comprehensive information about the place including the name, location, floor number, and user ratings. It includes:
    - **Location Details**: Shows the name and exact location using the Google Maps API.
    - **Ratings Overview**: Displays average ratings and the number of reviews.
    - **Detailed Ratings**: Breakdown of subratings like cleanliness and accessibility, visualized through the `RatingBar` component.
    - **User-Generated Content**: Displays images uploaded by users concerning the place.

### 3. Comments Section:
- **CommentFilter**: Allows users to sort comments based on criteria like recency or popularity.
- **CommentList**: Lists all comments related to the place, with functionalities to upvote or downvote, and edit comments for logged-in users.

### 4. Footer:
- **Footer**: Placed at the bottom of the page, including additional links or information about the application.

## RatingPage Interaction Flow

1. **Navigate to RatingPage**:
    - Users access the RatingPage via the NavBar or direct links from other parts of the application.

2. **View Place Details**:
    - The PlaceDetails component fetches and displays detailed information about the place, including maps and images.

3. **Interact with Comments**:
    - **Sorting Comments**: Users can sort comments by selecting criteria in the CommentFilter component.
    - **Engage with Comments**: Users can upvote, downvote, or edit comments through the CommentList component.

4. **Review and Feedback**:
    - Users review the information displayed and can interact with the content through various engagements such as ratings and comments.

5. **Navigation and Additional Interactions**:
    - Users can navigate to other pages to add ratings or edit place details, facilitated by navigation links and buttons within the PlaceDetails component.

## RatingPage Functionality

- **Place Details and Ratings**:
    - **Comprehensive Display**: Show detailed information about the place including location, ratings, and user-generated images.
    - **Ratings Breakdown**: Users can view overall and specific sub-ratings which give insight into different aspects of the place like accessibility.
    - **Map Display**: Users can click into the link of the place and be re-directed to Google Map, or view the place directly in embeded google map.
    - **BookMark**: Users can bookmark the place.

- **User Engagement with Comments**:
    - **Comment Sorting**: Users can sort comments to find the most relevant, recent, or popular ones.
    - **Comment Interaction**: Users can engage with comments through actions like upvoting and downvoting. Logged-in users can edit their comments.

- **Image Viewing**:
    - Users can view images related to the place, uploaded by other users, providing a visual understanding of the place.


## Usage

- Import the `LocationForm` component into your application and include it in the desired page layout.
- Users can interact with the form to add a new location, providing data such as ratings, tags, comments, and images.
- Upon form submission, the data is sent to the backend API for processing and storage.
