# Stage 1: Build the Angular app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm@9
RUN pnpm install @angular/cli
RUN pnpm install

COPY . .

RUN pnpm run build --configuration production

# Stage 2: Serve the app with an Nginx server
FROM nginxinc/nginx-unprivileged:stable-alpine-slim

COPY --from=build /app/dist/superb-calendar /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
