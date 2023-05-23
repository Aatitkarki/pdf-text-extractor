# Use the official Node.js base image
FROM node:20-alpine3.16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Start the application
CMD [ "node", "server.js" ]
