# Step 1: Use an official OpenJDK runtime as a parent image
FROM openjdk:19-jdk

# Step 2: Set the working directory inside the container
WORKDIR /app
COPY pom.xml .
COPY src ./src
COPY target/RatingBackend-0.0.1.jar app.jar
# Step 3: Copy the jar file from your target directory to the container



# Step 4: Make port 8080 available to the world outside this container
EXPOSE 8080

# Step 5: Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
