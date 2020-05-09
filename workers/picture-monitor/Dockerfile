FROM node:alpine
WORKDIR /usr/src/app
COPY ./package*.json  /usr/src/app/
RUN npm install
COPY **.js /usr/src/app/
