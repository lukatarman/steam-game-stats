FROM node:18.17.0-alpine3.18

WORKDIR /app/steam-game-stats

COPY ["package.json", "package-lock.json*", "./"]
COPY ./backend /app/steam-game-stats/backend

RUN npm ci -w backend

EXPOSE 3000

RUN chown -R node /app/steam-game-stats

USER node

CMD [ "npm", "start", "-w", "backend" ]
