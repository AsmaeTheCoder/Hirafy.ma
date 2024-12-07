FROM node:16-alpine

WORKDIR /api-gateway

COPY package*.json ./
RUN npm install --production

COPY . .

CMD node index.js