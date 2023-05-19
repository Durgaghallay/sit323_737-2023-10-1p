FROM node:16

# Create app directory

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
COPY package*.json ./
RUN npm install
#Bundle app source
COPY index.js .
COPY healthcheck.js .
EXPOSE 3040
CMD [ "node", "index.js" ]