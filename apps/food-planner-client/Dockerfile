FROM node:lts-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@jcmono/food-planner-client --docker

FROM node:lts-alpine AS installer
WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm install --frozen-lockfile

FROM node:lts-alpine AS builder
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm run build

# Serve the build using Caddy
FROM caddy:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ .

# Copy the production build to specific dir in caddy
COPY apps/food-planner-client/dist /usr/share/caddy

# Copy Caddyfile for our custom configuration
COPY apps/food-planner-client/Caddyfile /etc/caddy/Caddyfile