# Use the official Node.js image for building the React app
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json (if available) to ensure caching works for npm install
COPY package*.json ./
RUN npm install

# Copy the rest of the app's code and build it
COPY . .
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
