FROM node:16.13.0

# Set location for the app
WORKDIR /usr/src/backend


# Install dependencies
COPY package.json .
RUN npm install

# Expose ports
EXPOSE 3001

# Copy sources
COPY . .

# Start the app
CMD npm start