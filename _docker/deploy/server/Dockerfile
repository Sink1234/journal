ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY ../../../server/ ./
RUN yarn install

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

EXPOSE 4200

ENV PORT 4200

ENTRYPOINT ["yarn","start"]