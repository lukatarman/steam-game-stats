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

const pinoLogger = pino(loggerConfig);

class Logger {
  info(msg) {
    return pinoLogger.info(`${this.#caller} ${msg}`);
  }

  error(msg) {
    return pinoLogger.error(`${this.#caller} ${msg}`);
  }

  warn(msg) {
    return pinoLogger.warn(`${this.#caller} ${msg}`);
  }

  get #caller() {
    const e = new Error();
    const frame = e.stack.split("\n")[3];
    const fileName = frame.split(":").reverse()[2].split("/").reverse()[0];
    const functionName = frame.split(" ")[5];
    const lineNumber = frame.split(":").reverse()[1];
    return `\x1b[30m[${fileName}:${functionName}:${lineNumber}]\x1b[36m`;
  }
}

export const logger = new Logger();
