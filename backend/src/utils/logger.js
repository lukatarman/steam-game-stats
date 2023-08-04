import pino from "pino";

export const loggerConfig = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
};

export const logger = pino(loggerConfig);
