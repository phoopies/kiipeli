# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the client app
RUN yarn run build

# Expose the port that the client runs on
EXPOSE 3000

# Start the client
CMD [ "yarn", "start" ]