 # Create image based on the official Node 6 image from the dockerhub
FROM node:8

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

RUN mkdir -p /src

# Copy dependency definitions
COPY . /usr/src/app

# Install dependecies
RUN npm install && npm install tsc -g

# build
RUN npm run build-ts

# Expose the port the app runs in
EXPOSE 5000

# Serve the app
CMD ["node", "dist/server.js"]