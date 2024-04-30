# Navigation Page

This documentation outlines the structure and functionality of the Navigation Page of EagleRating, a web application for rating various places at Emory University.

## Navigation Page Structure

The Navigation Page provides a user-friendly interface that allows users to sort and filter locations to find what they're looking for quickly. The page is designed with an emphasis on user experience, offering a clean layout and responsive functionality.

## Page Layout

1. **Navigation Bar**
    - `NavBar`: Consists of the EagleRating logo, search functionality, category filtering, profile access, and logout capability.

2. **Main Content**
    - **Results Section**: Displays a list of locations that users can interact with.
        - `ResultList`: Lists locations with options to sort by rating and additional criteria.
    - **Filter Section**: Allows users to refine their search based on various attributes.
        - `FilterRating`: Provides a slider for users to filter locations by rating.
        - `FeatureFilter`: Offers tags for users to select or deselect to filter locations by features such as 'Water Fountain' or 'Charging Port'.

3. **Footer**
    - `Footer`: Contains additional links and information about the EagleRating platform, including terms of service, privacy policy, and contact information.

## Interaction Flow

1. **Sorting Locations**:
    - Users can sort the list of locations by highest rating, lowest rating, or most ratings using the sort dropdown in the `ResultList` component.

2. **Filtering Locations**:
    - The `FilterRating` slider allows users to set a minimum rating threshold, displaying only locations that meet this criterion.
    - The `FeatureFilter` tags enable users to further refine results based on specific attributes of the locations.

3. **Bookmarking Locations**:
    - Users can bookmark locations for later reference by clicking on the bookmark icon within the `ResultList`.

4. **Viewing Location Details**:
    - By clicking on a location within the `ResultList`, users are redirected to a detailed page with more information about that particular location.

## Included Components

- `NavBar`: A persistent top navigation bar present across the platform.
- `ResultList`: A component that displays the sorted and filtered list of location results.
- `FilterRating`: A component that allows users to filter results based on location ratings.
- `FeatureFilter`: A set of components that allow users to filter results based on location features.
- `Footer`: A standard footer component for additional site navigation and information.

## Methods

- **fetchData()**:
    - **Purpose**: Retrieve location data based on search parameters or category selections.
    - **Output**: An array of location objects that match the search and filter criteria.

- **handlePlaceClick(placeId)**:
    - **Purpose**: Handle the event when a user selects a location, directing them to the detailed location page.
    - **Input**: `placeId` (String) - The identifier for the selected location.

- **loadMoreResults()**:
    - **Purpose**: Incrementally display more location results as the user chooses to expand the list.

- **loadAllResults()**:
    - **Purpose**: Display all available location results.

## Dependencies

- `React`: Utilized for creating the component-based user interface.
- `react-router-dom`: Employed for handling in-app routing and navigation.
- `Axios`: Used for performing HTTP requests to retrieve or send data to the server.
- `Material-UI`: Incorporated for pre-styled components and design consistency.

## Usage

- The Navigation Page is accessed from the Home Page when users wish to search for specific locations, sort, or apply filters.
- Users interact with the `ResultList` and `FilterRating` components to refine their search and navigate to the detailed pages of locations.
- Updates to the list of results are dynamically rendered based on user interactions with the sorting and filtering options.
