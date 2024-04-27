# Back End Documentation
The entire backend implementation is in the "unitask" folder. This
documentation includes a thorough run through of this folder structure
and the functions of each file.

The backend implementation is done in the MacOs system. The code has
been run on a Windows system for the test purpose. The implementation
hasn't been run and tested on any other system.

> [!IMPORTANT]
> The detailed technical Api of JavaDoc for this project is in API folder: https://github.com/henrydierkes/Eagle_Rating/Documentation/Technical/Backend/api
> which contains more detailed implementation of api we provided.


**Versions:**

Spring boot: 2.6.4

Maven: 3.10.1

JDK: 19

**Tools:**

IntelliJ IDEA Ultimate.

MongoDB Campus for tables viewing.

Postman and swagger-ui for APIs testing.

1.  **.mvn/wrapper**

the .mvn/wrapper folder contains the Maven Wrapper files. The Maven
Wrapper is a way to ensure that the correct version of Apache Maven is
used to build a project, regardless of whether the developer has Maven
installed locally.

1.  **maven-wrapper.jar**

This is the JAR file that contains the Maven Wrapper code. It\'s a small
JAR file that includes the logic needed to download the specified
version of Maven if it\'s not already installed.

2.  **maven-wrapper.properties**

This properties file specifies the Maven version that should be used by
the wrapper. It contains a property like distributionUrl, which points
to the Maven distribution to be downloaded.

2.  **src**

**2.1 main**

the src/main directory structure is a convention used by Maven and other
build tools to organize the source code of the application. The src/main
directory is part of the standard Maven project structure and is used to
separate the main source code of the application from other resources
and configurations.

**2.1.1 java/com/aster/ratingbackend**

This directory contains the main Java source code of the Spring Boot
application. All the Java classes, packages, and code related to the
main functionality of the application are placed here.

The detailed explanation for all the classes and functions are in this
link:

### 2.1.1.1 Config

This directory contains Java files for different configurations in your application:

- `CorsConfig.java`: Configures Cross-Origin Resource Sharing (CORS) settings for your application.
- `SecurityConfig.java`: Configures security settings such as authentication and authorization.
- `MultipartFileConfig.java`: Configures file upload settings, including limits and allowed types.
- `SwaggerConfig.java`: Configures Swagger UI for API documentation and testing.

### 2.1.1.2 Controller

This directory contains REST controllers that define the API endpoints:

- REST controllers handle HTTP requests, such as CRUD operations for entities.
- Controllers typically interact with services to handle business logic and return responses.

### 2.1.1.3 Entity

This directory contains entity classes that represent data models mapped to database tables:

- Entities often use JPA annotations for mapping fields to database columns.
- Example entities might include `User`, `Place`, or `Rating`.

### 2.1.1.4 Model

This directory contains model classes representing data structures used in your application:

- **DTOs**: Data Transfer Objects (DTOs) are used for efficient data communication.
    - For example, `AuthRequest.java` and `VerificationRequest.java` for transferring user data, respectively.
- **MongoDB Repository**: Includes interfaces that extend MongoDB repository classes for database operations.
    - For example, `UserRepository.java` and `PlaceRepository.java` for interacting with the database.

### 2.1.1.5 Service

This directory contains service classes that handle business logic:

- Services contain methods for managing entities and other business operations.
- Examples of services include `UserService` and `PlaceService`.
- Services interact with repositories to perform CRUD operations on entities.


### 2.1.1.6 RatingBackendApplication

This directory contains the main application class that serves as the entry point for your application:

- `RatingBackendApplication.java`: Contains the `main` method that starts the application.
    - Initializes the Spring Boot application.
    - Sets up the application context, including beans and configurations.
    - Handles application startup tasks such as database connections and scheduling tasks.
  
<https://unitask-backend-docs.netlify.app/>
**2.1.2 resources**

the src/main/resources directory is a standard Maven project structure
that is used to store non-Java resources.

**2.1.2.1 application.yml**

This file is a YAML-formatted configuration file that is commonly used
in Spring Boot applications to define various settings and properties.

This file configures the database connection and its properties, the
application properties for the spring security implementation, and the
mail service settings.

-   Server Configuration

> Error Handling Configuration:
>
> include-message: Set to \"always\" to include error messages in error
> responses.
>
> include-binding-errors: Set to \"always\" to include binding errors in
> error responses.

-   Spring Data JPA Configuration

> JPA and DataSource Configuration:
>
> hibernate.ddl-auto: Specifies the database schema update strategy.
>
> datasource: Configures the MongoDB database connection details.

-   Mail Configuration:

> Configures the SMTP server details for sending emails.

-   MVC and CORS Configuration

> Configures Cross-Origin Resource Sharing (CORS) for MVC endpoints.

-   Jackson Serialization Configuration

> Configures Jackson serialization settings, such as handling empty
> beans and default property inclusion.

-   Custom Application Properties

> Defines custom application properties such as JWT secret and
> expiration time.

The database used for this project is a MongoDB database created on MongoDB Atlas Database


2.  **Test**

The src/test folder is commonly used to store test source code and
resources.

3.  **.gitignore**

the .gitignore file is used to specify files and directories that should
be ignored by Git, the version control system.


4.  **pom.xml**

This file configures all the dependencies used for the backend
implementation.

A full list of dependencies used are listed here:

-   Spring Boot Starter Data MongoDB

-   Spring Boot Starter Web

-   Spring Boot Starter Security

-   Commons FileUpload (version 1.4)

-   Knife4j Spring Boot Starter (version 2.0.8)

-   Spring Boot DevTools (optional, scope: runtime)

-   Project Lombok (optional)

-   Spring Boot Starter Test (scope: test)

-   Java JWT (JSON Web Token) API (version 3.18.2)

-   Jackson Datatype JSR310

-   Spring Boot Starter Mail

-   Apache HttpClient (version 4.5.13)

-   Fluent HC (version 4.5.13)

6.  **system.properties**

This file is for the backend deployment use. It configures the version
of java JDK this backend implementation is using. For this
implementation, the java version used is 19.
