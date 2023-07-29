FROM node:18.17.0-alpine3.18

WORKDIR /app/steam-game-stats

COPY package*.json /app/steam-game-stats
COPY ./backend /app/steam-game-stats/backend

RUN npm ci -w backend

CMD [ "npm", "start", "-w", "backend" ]

EXPOSE 3000