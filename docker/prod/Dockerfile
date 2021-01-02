# stage1 as builder
FROM node:12.20-alpine as builder

WORKDIR /app

# copy the package.json to install dependencies
COPY package.json  .

# Install the dependencies and make the folder
RUN npm install

COPY . .

# Build the project and copy the files
RUN npm run ng build --prod

FROM nginx:alpine

#!/bin/sh

COPY docker/prod/.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist/game-room /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
