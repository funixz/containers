FROM node:latest

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

#copy across source
COPY . /usr/src/app

ENV PORT 9000
ENV HOSTNAME "0.0.0.0"

ENTRYPOINT node app.js $HOSTNAME $PORT