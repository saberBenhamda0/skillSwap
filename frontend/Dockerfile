# Use the official Node.js image.
FROM node:22.8.0-alpine AS build

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the Vite application.
RUN npm run build

# Use a smaller image for running the application.
FROM nginx:alpine


COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application from the build stage.
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port that the application runs on.
EXPOSE 80

# Start Nginx.
CMD ["nginx", "-g", "daemon off;"]
