# Use a Node.js base image
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /usr/share/react

# Install curl
RUN apk add --no-cache curl

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps


# Copy the rest of the application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Use Nginx as the base image for serving the static files
FROM nginx:alpine

RUN chmod -R 755 /usr/share/nginx/html

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built application from the previous stage to Nginx's web server directory
COPY --from=build /usr/share/react/dist /usr/share/nginx/html



# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
