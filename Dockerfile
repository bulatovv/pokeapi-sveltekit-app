FROM node:21-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


ARG PUBLIC_POKEAPI_GRAPHQL_ENDPOINT
ENV PUBLIC_POKEAPI_GRAPHQL_ENDPOINT=${PUBLIC_POKEAPI_GRAPHQL_ENDPOINT}
COPY . .
RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit dev

COPY --from=builder /app/build ./build

ENV NODE_ENV=production
CMD ["node", "build"]
