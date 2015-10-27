# Set the base image to Ubuntu
FROM node:0.12.7-wheezy

# File Author / Maintainer
MAINTAINER Waleed Samy <waleed_samy@ymail.com>

# Install Node.js and other dependencies
RUN apt-get update && apt-get -y install curl vim

# Install nodemon
RUN npm install -g forever grunt-cli bower nodemon

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD . /src

# Expose port
EXPOSE  8080

RUN ls -la

# Run app using nodemon
CMD forever /src/index.js
