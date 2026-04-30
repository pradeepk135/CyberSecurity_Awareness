# ── Development stage ──────────────────────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Install deps first (layer-cached unless package.json changes)
COPY package*.json ./
RUN npm install

# Copy source and entrypoint
COPY . .
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 5173

# Use dumb-init and entrypoint for proper signal handling
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]


# ── Production build stage ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# ── Production serve stage (nginx) ────────────────────────────────
FROM nginx:alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html

# React Router needs all routes to fall back to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
