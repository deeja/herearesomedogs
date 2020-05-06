FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn generate

FROM nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html