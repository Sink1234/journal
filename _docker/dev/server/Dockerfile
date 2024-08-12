ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY ../../../server/package.json ./
RUN yarn install

EXPOSE 4200

CMD ["yarn", "start:dev"]
