ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY ../../../client/package.json ./
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
