# Project Name: Eagle Frontend
### Team: A*
### Project Name: Eagle Rating

## Overview
Eagle Frontend is a web application designed for Eagle Rating, a social media intended for university students to rate places around their campus. This project contains all the frontend code necessary to build and run the user interface of Eagle platform.

## Project Structure
The project follows a standard React application structure with the following directories:

- `src`: Contains the main source code for the application.
    - `assets`: Static assets like images, fonts, and shared styles.
    - `components`: Reusable React components for the application.
        - `Background`: Components related to the background UI elements.
        - `Category`: Components for displaying categories.
        - `Filter`: Components for filtering results.
        - `Footer`: The footer component with associated styling.
        - `NavBar`: Navigation bar component and its styling.
        - `ResultList`: Components to display a list of results.
        - `SearchBar`: Search bar component.
        - `subComponents`: Smaller components used within other components.
        - `TopComments`: Components to feature top comments.
        - `Trending`: Components to display trending items.
    - `fonts`: Custom fonts used in the application.
    - `pages`: Components representing entire pages of the application.
        - `Home`: Home page component and styling.
        - `Navigation`: Navigation component for page transitions.
        - `RatingPage`: Components for the rating page.
- `public`: Contains the public assets served by the application such as images and the `index.html` file.
- `.vite`: Configuration files for Vite, a frontend build tool.
- `node_modules`: Contains all the npm packages and dependencies for the project.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Start the development server with `npm run dev`.

## Usage

Once the development server is running, you can view the application by navigating to `http://localhost:3000` in your web browser.

## Contributing

We welcome contributions to Eagle Frontend! Please read our contributing guidelines before submitting a pull request.

## License

Eagle Frontend is [licensed under the MIT License](LICENSE.md).

## Contact

For any additional questions or comments, please contact Tuan Vinh (@tvinh@emory.edu).
