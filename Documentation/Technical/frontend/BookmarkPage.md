# Bookmark Page
The `Bookmark` page is designed to allow users to see places that they have stored and want easy access to through only a few clicks. This page allows users to access all the pages related to their bookmarked places rather than having to search them up individually. 

## Bookmark Page Structure

The `Bookmark` page is structured in a straightforward layout that consists of a navigation bar, a list of the bookmarked pages, and a footer. Here's an outline of the page structure and the key components:

## Page Layout

1. **Navigation Bar**
    - `NavBar`: At the top of the page, the navigation bar component provides navigation options and links to other parts of the application.

2. **Main Content: Bookmark List**
    - The `Bookmark List` component encompasses the entire main content of the page. It includes:
    
        - **Bookmarked Pages**: In the navigation page, users can save pages by clicking on the bookmark icon in the top left of the place description box. This will then allow them to be shown in the bookmark page. 
        

    - **Bookmark List Elements**:
        - `Place description box`: The bookmarked pages' place description boxes that are located in the bookmark page have full functionality similar to the ones in the navigation page. They can have their bookmarked status removed, removing them from the bookmark page, and they can be clicked which takes the user to that respective rating page. 

3. **Footer**
    - `Footer`: At the bottom of the page, the footer component may include links or additional information about the application.

## Page Interaction Flow
1. **Navigate to Bookmark Page**:
   - Users arrive at the `Bookmark` page by clicking the bookmark icon next to the user's name in the `NavBar`.

2. **View Bookmarked Pages**:
    - The user can view their bookmarked pages in the order in which they were added. 

3. **Interact with Bookmarked Pages**:
    - Users can click on the place to take them to the rating page or click the bookmark icon to remove the place from the page. 

This page structure ensures a seamless and user-friendly experience for viewing the bookmarked pages a user has stored. 

## Included Components

- `NavBar`: A navigation bar that is included at the top of the form.
- `Footer`: A footer included at the bottom of the form.
- `bookmarkHighlightIcon`: A Material-UI component that is a highlighted bookmark icon.

##  Methods

- **getRatingColor (averageRating)**:
    - **Purpose**: Gets the color that corresponds to the rating (red is bad, yellow is medium, and blue is good).
    - **Input**: `averageRating` (number) - The average rating of the place.

- **clickBookmarkApi(userId, placeId)**
    - **Purpose**: This adds the place id under the bookmarks section of the user in the backend so that it can be retrieved later. 
    - **Input**: `userId` (String) - The id of the user; `placeId` (String) - The id of the place.

- **toggleBookmark(placeId, event)**
    - **Purpose**: Calls the clickBookmarkApi function for the correct userId and placeId. 
    - **Input**: `placeId` (String) - The id of the place; `event` - The tag selection event (a click in this case).

- **navigateToLocationDetail(placeId)**
    - **Purpose**: Navigates the user to the correct rating page for the place that was clicked. 
    - **Input**: `placeId` (String) - The id of the place. 

## Dependencies

- `React` and related hooks (`useState`, `useNavigate`, `useLocation`).
- `axios` for API requests.
- `@mui/material` components for form inputs and styling.
- Other dependencies such as `useAuth` and relevant styles and assets.

## Usage

- Import the `RatingForm` component into your application and include it in the desired page layout.
- Users can interact with the form to add a new rating for a place, providing data such as ratings, tags, comments, and images.
- Upon form submission, the data is sent to the backend API for processing and storage.
