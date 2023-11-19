FROM node:20.9.0-alpine3.18 AS base

ENV NODE_ENV=development

WORKDIR /app

COPY src/package*.json .

RUN npm install && npm cache clean --force

ENV PATH=/app/node_modules/.bin:$PATH

COPY src .

FROM base AS production

ENV NODE_PATH=./dist

RUN npm run build
