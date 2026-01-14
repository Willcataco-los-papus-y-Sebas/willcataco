# Stage 1: Build
FROM node:24.12.0-alpine3.23 AS build

ARG NG_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build -- --configuration=$NG_ENV

# Stage 2: Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/willcataco/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
