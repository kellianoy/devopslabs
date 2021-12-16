# Specify the parent image from which we build
FROM node:12

# Add the folder we want to the image
ADD ./userapi /app/

# Set the working directory
WORKDIR /app

# Copy package.json
COPY ./userapi/package*.json ./

# Install dependancies
RUN npm i

# Copy everything from host to docker
COPY . .

# Expose the port we want 
EXPOSE 3000

# Run npm start
CMD [ "npm", "start" ]
