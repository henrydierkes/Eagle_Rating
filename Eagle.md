# Project Name

## Introduction

This project introduces a comprehensive platform designed for Emory University students to rate and discover places on campus. It addresses the need for a centralized, user-friendly repository of campus locations, ranging from dining areas to study rooms, based on real student feedback.

### Purpose

The purpose of this platform is to enhance the campus experience for Emory University students by providing a reliable and intuitive resource for exploring campus facilities and services. It aims to foster a connected and informed student community, where members can make informed decisions about where to eat, study, and relax based on peer reviews.
### Target Audience

The primary users of this project are Emory University students seeking to explore and rate campus facilities. Additionally, university administrators can utilize the platform to gather student feedback and identify areas for improvement.
### Key Features

- **Search Functionality:** Users can search for campus places by name and category.
- **Rating System:** Students can rate places they have visited, with the ability to update their ratings.
- **Trending Places:** The platform highlights trending locations based on average star ratings.
- **User Comments:** Each place features user comments that provide additional context and opinions.
- **Image Uploads:** Users can upload images of places to offer visual insights.
- **Account Management:** Features include sign-up, login, and Emory email verification.
- **Content Management:** Users can suggest new places, which are subject to periodic verification by the system.

### Production Log

Document the project's development timeline, highlighting key milestones and progress updates.

## Team Members

Tuan Vinh: front end <br>
Henry Dierkes: front end <br>
Jonathan Wang: back end <br>
Wenzhuo Ma: front end, back end <br>
Tung Dinh: back end 


## Table of Contents

(Automatic or manual Table of Contents linking to sections below.)

## User Guide

### Installation Instructions

This guide covers the installation process for both the backend and frontend components of the project. Follow these steps to set up and run the application.

#### Prerequisites

Before you begin, ensure you have the following tools installed on your system:

- **Java JDK 11 or higher:** Download and install from [Oracle's JDK download page](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
- **Node.js 14.x or higher:** Download and install from [Node.js official website](https://nodejs.org/en/download/).
- **npm:** Normally installed with Node.js.
- **Maven:** Download and install from [Apache Maven Project](https://maven.apache.org/download.cgi).
- **Git:** Download and install from [Git SCM](https://git-scm.com/downloads).
- **An IDE of your choice:** Such as IntelliJ IDEA for Java or Visual Studio Code for JavaScript.

#### Backend Installation (Java Spring Boot)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/henrydierkes/Eagle_Rating.git
   cd Eagle_Rating/main/RatingBackend/src/main/java/com.astar.ratingbackend
2. **Install Maven Dependencies:**
   Execute the following command to install the project dependencies with Maven:
   ```bash
   mvn clean install
3. **Run the Backend:**
   Use Maven to start the Spring Boot application with the following command:
   ```bash
   mvn spring-boot:run

#### Frontend Installation (React with Vite)

1. **Navigate to the Frontend Directory:**
   ```bash
   cd Eagle_Rating/main/web/eagle-frontend

2. **Install npm Dependencies:**
   Execute the following command to install the project dependencies with Maven:
   ```bash
   npm install --legacy-peer-deps
3. **Start the Frontend Development Server:**
   Use Maven to start the Spring Boot application with the following command:
   ```bash
   npm run dev
### How to Use the Software

#### Home Page

When you first visit the EagleRating platform, you'll be greeted by the home page. Here's how to get started:

1. **Using the Search Bar**: At the top of the home page, you will find a search bar. You can type the name of the place or select a category from the dropdown to begin your search.
   ![EagleRating Home Page](./assets/HomePage1.png "EagleRating Home Page")
2. **Selecting a Trending Place**: Click on any of the trending place cards to get detailed information, including user reviews and a gallery of images uploaded by students.
   ![EagleRating Home Page](./assets/HomePage2.png "EagleRating Home Page")
3. **Accessing Categories**: Click on any category to view a filtered list of places within that category. This makes it easier to find specific types of locations on campus.
4. **Signup and Login**: If you want to add a rating or location, you have to log in first. Both buttons are beside the search bar. Click on them to enter another page of login or signup.
5. **Edit Profile Page**: If you want to edit your avatar, username, or password, click on the username or email underlined on the search bar. This will guide you to the profile page, which only shows up once the user is logged in.
6. **View Bookmarked place** If you have bookmarked a few places on our websites, you can click on the small bookmark icon beside your username on the search bar. This function will only be available once you log in.
7. **Adding a Location**: If you want to add a new location to the platform, click the 'Add Location' button. This is available on both the home page and the navigation page

#### Navigation Page

After performing a search, you'll be directed to the navigation page, where you can see the list of results.

1. **Viewing Search Results**: The list of locations matching your search criteria will be displayed here. Each location card provides a snapshot of the rating and number of reviews.

   ![EagleRating Navigation Page](./assets/navigation.png "EagleRating Navigation Page")

2. **Filtering by Rating**: You can filter the results based on the overall rating by adjusting the slider provided. Once you dragged the filter, the place be shown will only be greater or equal to the filtered rating you set.
3. **Filtering by Tag**: You can filter the results based on tags. If you want a specific tag to be present on you place, you can click the tag to add it to the querying criteria. If you want to remove a tag, simply unclick the selected tag.

4. **Sorting Results**: Sort the search results by selecting an option from the 'Sort by' dropdown menu, such as 'Highest Rating'.

5. **Selecting a Location**: Click on a location to see detailed information, including reviews and photos posted by other students, or to rate a place.
6. **Bookmarking a Location**: If you come across a location you’d like to save for quick access later, you can bookmark it by clicking the bookmark icon on the location card.

7. **Accessing Bookmarked Locations**: To view all your bookmarked locations, navigate to the bookmark page from the hovered bar on top. This page will display a list of your saved locations for easy reference.

   ![Bookmarked Locations](./assets/bookmarks.png "Bookmarked Locations")
#### Place Detail Page

The Place Detail Page provides you with comprehensive information about a specific location on campus.

1. **Overview of Location**: Here, you'll find the overall rating, different sub-ratings, the total number of ratings, and an interactive map pinpointing the exact location. The ratings, comments, and images uploaded by other users will also be shown; you can submit your rating as well.

   ![Place Overview](./assets/PlaceDetail1.png "Place Overview")

2. **Adding a Rating**: To contribute your own experience, click the 'Add Rating' button. You can give a star rating, upload an image and write a review for the place.

3. **Interacting with Ratings**: Below the location details, you'll find ratings left by other users. You can like or dislike their ratings to express your agreement or disagreement.

   ![Ratings Interaction](./assets/PlaceDetail2.png "Ratings Interaction")

4. **Gallery and Comments**: Navigate through the gallery of images uploaded by users and read comments to get more insights about the place. You can sort the comments by recency and popularity.
5. **Link to Google Map**: You can link to Google Map by clicking the blue link above the map.
#### Adding Ratings to a Place

When you've had an experience with a place on campus that you'd like to share, the EagleRating platform allows you to easily add a rating.

1. **Initiating a Rating**: On the Place Detail Page, click the 'Add Rating' button to start the process.

3. **Completing the Rating Form**: Provide an overall star rating and, if applicable, sub-ratings for different aspects like "Clean", "Amenities", and "Quiet Level". You can also include tags for specific features such as "Charging Port" or "Water Fountain".

   ![Rating Form](./assets/RatePlace1.png "Rating Form")

4. **Adding Comments and Images**: Share more about your experience by typing a comment and uploading images that represent your experience.

   ![Rating with Subratings](./assets/RatePlace2.png "Rating with Subratings")

5. **Submitting Your Rating**: Once you've filled out the form, click 'Submit' to add your rating to the place. If you have previously rated the place, you can decide whether to replace your previous rating or not.

#### Adding a New Place

If you find a spot on campus that's not listed on EagleRating, you can add it yourself.

1. **Accessing the Add Place Form**: Look for the 'Add Location' button on the home page or navigation page and click it to access the form to add a new place.
2. **Provide a category**: Please select the category of the place first, then our form will generate details you need to fill according to the category.

3. **Filling Out the Details**: Provide the name of the place, the location, and any other relevant details. You can also rate the place right away by providing a rating and comment.

   ![Add Place Form](./assets/AddPlace.png "Add Place Form")

4. **Awaiting Verification**: After submission, the new place will undergo verification by the platform administrators. It will be visible to all users once verified.
#### Managing Your Profile

Your profile page is the hub for personalizing your EagleRating experience. Here you can update your profile details, change your password, and customize your avatar.

1. **Uploading an Avatar**: Personalize your account by uploading an avatar. Click on the 'UPLOAD AVATAR' button and select an image file from your device to set it as your profile picture.

   ![Profile Avatar Upload](./assets/ProfileAvatar.png "Profile Avatar Upload")

2. **Changing Your Username**: If you wish to change your username, enter the new username in the designated field and click 'CHANGE USERNAME'. Remember, your username must be unique and adhere to the platform's guidelines.

3. **Updating Your Password**: For security reasons, it's good practice to update your password regularly. To change your password, enter the new password, confirm it, and then click 'CHANGE PASSWORD' to complete the update.

   ![Profile Settings](./assets/ProfileSettings.png "Profile Settings")

### Troubleshooting and FAQs

List common issues that users might encounter and their solutions, along with frequently asked questions.

## Technical Documentation

### System Architecture

Describe the overall architecture of the system, including major components and their interactions.

### Codebase Overview

Offer a high-level overview of the structure of the codebase, including key modules and classes.

### API Documentation

Provide detailed documentation of the APIs, including parameters, return types, and example calls.

## Development

### Development Environment Setup

Instructions on setting up the development environment, including required software and tools.

### Build Instructions

Explain how to build the software from source, including any build scripts or automation used.

### Testing Procedures

Describe the testing strategy, including how to run tests and report issues.

## Deployment

### Deployment Procedures

Step-by-step guide to deploying the software in a production environment.

### Server Requirements

Specify the hardware and software requirements needed to deploy and run the software effectively.

### Configuration Files

Detail important configuration files, their location, and how to modify them for different environments.

## Contributing

### How to Contribute

Guidelines for external contributors who wish to contribute to the project, including contact information.

### Pull Request Process

Explain the process for submitting pull requests, including coding standards and review requirements.

### Code of Conduct

Emory Honor Code: THIS CODE IS MY OWN WORK, IT WAS WRITTEN WITHOUT CONSULTINGCODE WRITTEN BY OTHER STUDENTS.
Own work here means the entirety of the A* team: Tuan Vinh, Henry Dierkes, Jonathan Wang, Wenzhuo Ma, and Tung Dinh.

## License

### License Information

Provide details on the project's license and what it permits others to do with the software.

## Acknowledgments

### Credits

Team A*: Tuan Vinh (tuan.vinh@emory.edu), Henry Dierkes (henry.dierkes@emory.edu), Jonathan Wang (jonathan.wang@emory.edu), Wenzhuo Ma (max.ma@emory.edu), and Tung Dinh (tung.dinh@emory.edu). As well as Professor Jeffrey Epstein for guiding us through our project. 

### References
 

### External Resources

Link to external resources, tutorials, or other documentation that supports the project.

## Appendices

Include detailed appendices if needed, such as full database schemas, additional code snippets, or extensive data tables.

