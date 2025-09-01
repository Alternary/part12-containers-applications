FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

USER node

CMD ["npm", "run", "dev", "--", "--host"]

# CMD ["npm", "run", "dev"]
