# Use Node.js 20.11.1 as the base image
FROM node:20.11.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the application's default port
EXPOSE 3000

# Define the default command to run the application
CMD ["yarn", "start"]