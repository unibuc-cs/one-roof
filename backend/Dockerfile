# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before running npm install (improves caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Set the environment variable (default to staging)
ARG NODE_ENV=staging
ENV NODE_ENV=$NODE_ENV

# Start the application based on the environment
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then npm run prod; elif [ \"$NODE_ENV\" = 'staging' ]; then npm run staging; else npm run dev; fi"]
