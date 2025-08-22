FROM node:18

WORKDIR /app

COPY ./package*.json ./server/
RUN cd server && npm install

COPY . ./server

EXPOSE 3005

CMD ["node", "server/server.js"]