ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY ../../../client/ ./
RUN yarn install --pure-lockfile

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN yarn build



USER nextjs

EXPOSE 3001

ENV PORT 3001

ENTRYPOINT ["yarn","start"]