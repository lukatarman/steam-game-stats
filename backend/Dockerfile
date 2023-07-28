FROM node:18.17.0-alpine3.18

WORKDIR /usr/src/steam-game-stats-backend

RUN addgroup -g 1001 srv && \
  adduser -u 1001 -G srv -s /bin/sh -D srv && \
  chown srv:srv -R /usr/src/steam-game-stats-backend

COPY package.json /usr/src/steam-game-stats-backend
RUN npm i

COPY . /usr/src/steam-game-stats-backend

USER srv

EXPOSE 3000

CMD [ "npm", "start" ]
