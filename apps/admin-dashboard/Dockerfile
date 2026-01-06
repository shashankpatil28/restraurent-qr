# ---- Builder Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package*.json ./
RUN npm ci --silent

COPY . .
# For Vite/React, we pass build-time variables if needed
RUN npx vite build

# ---- Production Stage ----
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# IMPORTANT: Path to nginx.conf in Dockerfile context
# Assuming we pass this through compose or context
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]