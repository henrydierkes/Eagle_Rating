# Home Page

This documentation outlines the structure and functionality of the Home Page of EagleRating, a web application for rating various places at Emory University.

## Home Page Structure

The Home Page presents a welcoming interface that allows users to navigate through categories and view trending locations with ease. It is designed for optimal user experience with a clean layout and responsive design.

## Page Layout

1. **Navigation Bar**
    - `NavBar`: Contains the logo, search bar, category dropdown, user profile access, and logout functionality.

2. **Main Content**
    - **Trending Section**: Highlights the most-rated locations, encouraging user interaction.
        - `TrendingCard`: Displays a snapshot of the trending locations along with their average ratings.
    - **Category Section**: Offers a categorized view of locations for a more targeted search.
        - `CategoryCard`: Represents different categories like buildings, study spaces, parking lots, dorms, and bathrooms.

3. **Footer**
    - `Footer`: Provides additional navigation and information about EagleRating, including contact information, social media links, and legal disclaimers.

## Interaction Flow

1. **Searching Locations**:
    - Users can type in a location name in the search bar and receive live suggestions.

2. **Selecting Categories**:
    - The dropdown allows users to filter locations by categories like study spaces, parking lots, etc.

3. **Engaging with Trending Locations**:
    - Trending locations can be clicked to view detailed ratings and reviews.

4. **Exploring Categories**:
    - Users can explore different types of locations by clicking on a category card.

## Included Components

- `NavBar`: A navigation bar that is included at the top of the form.
- `Background`: This component manages the background image or pattern that sets the visual tone for the Home Page. It is designed to be aesthetically pleasing and complementary to the content displayed.
- `Trending`: Highlights the most popular locations on campus as determined by user interactions and ratings. It dynamically updates to reflect the latest trends.
- `Category`: The Category component presents the different location categories available on the platform, allowing users to filter and navigate the site based on their specific interests or needs.- `Category`: The Category component presents the different location categories available on the platform, allowing users to filter and navigate the site based on their specific interests or needs.
- `Footer`: A footer included at the bottom of the form.

## Methods

- **getTrendy()**:
    - **Purpose**: Retrieve and display the trending locations based on user ratings.
    - **Output**: An array of location objects with ratings.

- **search(query)**:
    - **Purpose**: Perform search from the search bar input (text and category selection)
    - **Input**: `locName` (String) - The user's search input, `category` (String) - The user's chosen category 
    - **Output**: A list of suggested locations that match the query.
  
- **navigateToLocation(locationId)**:
    - **Purpose**: Redirect the user to the detailed page of the selected location.
    - **Input**: `placeId` (String) - The id of the place.

## Dependencies

- `React` for the component-based architecture.
- `React Router` for page navigation.
- `Axios` for making HTTP requests.
- `Material-UI` for UI components and icons.

## Usage

- The Home Page is the default landing page after a user logs in to EagleRating.
- Users can start their experience by searching for a place, browsing categories, or exploring trending locations.
- Each interaction leads to more detailed information about the location, enhancing the user's experience and engagement with the platform.
