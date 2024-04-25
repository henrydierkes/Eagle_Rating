# Use a Node.js base image for the build stage
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /usr/share/react

# Install curl (if needed)
RUN apk add --no-cache curl

# Install bash
RUN apk add --no-cache bash

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the built artifacts from the local 'dist' directory to the working directory
COPY dist/ .

# Use Nginx as the base image for serving the static files
FROM nginx:alpine

RUN chmod -R 755 /usr/share/nginx/html

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built application files into Nginx's web server directory
COPY --from=build /usr/share/react /usr/share/nginx/html

# Copy custom nignx config to container
COPY nginx.conf /etc/nginx/conf.d/default.conf