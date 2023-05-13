# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

## Copy app to WORKDIR folder
COPY . .

## Install packages
RUN yarn install

ENV PORT=5000

# Expose the port that the server listens on
EXPOSE 5000

## Save build date and time
RUN echo "BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> /app/src/server/.env

# Start the server
CMD [ "yarn", "start" ]