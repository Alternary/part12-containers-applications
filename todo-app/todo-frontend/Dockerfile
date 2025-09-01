FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

# ENV VITE_BACKEND_URL=http://localhost:3000
# ENV VITE_BACKEND_URL=http://localhost:3000/api
ENV VITE_BACKEND_URL=http://localhost:8080/api
# ENV VITE_BACKEND_URL2=http://localhost:1234

RUN npm ci

RUN npm run test

RUN npm run build

#these three commands turn off when doing nginx
# RUN npm install -g serve
#
# USER root
#
# CMD ["serve", "dist"]

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# EXPOSE 80
#
# CMD ["nginx", "-g", "daemon off"]
