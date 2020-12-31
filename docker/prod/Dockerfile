FROM node:12.20-alpine

WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@11.0.1
RUN npm install -g angular-http-server

# add app
COPY . /app

# start app
CMD ng build --prod

#deploy
CMD angular-http-server --path dist/game-room/ -p 4606
