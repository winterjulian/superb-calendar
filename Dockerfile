# Stage 1: Build the Angular app
FROM node:22-alpine AS build

WORKDIR /app

COPY . .

RUN npm install -g pnpm@9
RUN pnpm install @angular/cli
RUN pnpm install

RUN pnpm run build --configuration production

# Stage 2: Serve the app with an Nginx server
FROM nginxinc/nginx-unprivileged:stable-alpine-slim

COPY --from=build /app/dist/superb-calendar/browser /usr/share/nginx/html

EXPOSE 8080
