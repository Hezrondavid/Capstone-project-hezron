# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the app port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]

