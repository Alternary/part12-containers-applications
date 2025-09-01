FROM node:20

WORKDIR /usr/src/app

COPY . .

# ENV VITE_BACKEND_URL=http://localhost:3000
# ENV VITE_BACKEND_URL=http://server:3000
# ENV VITE_BACKEND_URL=http://server:8080/api
# ENV VITE_BACKEND_URL=http://server:3000/api
# ENV VITE_BACKEND_URL=http://app:3000/api
# ENV VITE_BACKEND_URL=http://localhost:8080/api
ENV VITE_BACKEND_URL=http://localhost:8080/api
# ENV VITE_BACKEND_URL2=http://localhost:8080/api
# ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
# CMD ["npm", "run", "dev"]
# CMD ["run", "start"]
