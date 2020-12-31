FROM node:12.20-alpine

WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@11.0.1

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
