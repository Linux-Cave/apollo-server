# Alpine - https://hub.docker.com/_/node
FROM node:14-alpine3.12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Cleanup	
RUN rm -f .npmrc

# Bundle app code
COPY . .

# Run
EXPOSE 4000
RUN npm run build	
CMD ["npm", "run", "start"]
