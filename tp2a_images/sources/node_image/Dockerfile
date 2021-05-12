FROM node:alpine

LABEL Formation=Docker
LABEL TP=2

WORKDIR /usr/src/app

COPY package.json server.js ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
