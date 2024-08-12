ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY ../../../dev-proxy/package.json ./
RUN yarn install

EXPOSE 4001

CMD ["yarn", "dev"]
