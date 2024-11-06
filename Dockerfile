# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /user/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will listen on
EXPOSE 3000

# Set the default command to run the app in development mode
CMD ["npm", "run", "dev"]
