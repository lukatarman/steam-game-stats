import pino from "pino";
import cloneDeep from "lodash.clonedeep";

export class Logger {
  #config;
  #l;

  constructor(logLevel) {
    this.#config = {
      level: logLevel,
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          ignore: "pid,hostname",
          levelFirst: true,
        },
      },
    };

    this.#l = pino(this.#config);
  }

  info(obj, msg, ...args) {
    return this.#l.info(obj, msg, ...args);
  }

  error(obj, msg, ...args) {
    return this.#l.error(obj, msg, ...args);
  }

  warn(obj, msg, ...args) {
    return this.#l.warn(obj, msg, ...args);
  }

  debug(obj, msg, ...args) {
    return this.#l.debug(obj, msg, ...args);
  }

  // adds caller reference to log output
  debugc(msg, ...args) {
    return this.debug({ caller: this.#caller }, msg, ...args);
  }

  fatal(obj, msg, ...args) {
    return this.#l.fatal(obj, msg, ...args);
  }

  get #caller() {
    const e = new Error();
    const frame = e.stack.split("\n")[3];
    const fileName = frame.split(":").reverse()[2].split("/").reverse()[0];
    const functionName = frame.split(" ")[5];
    const lineNumber = frame.split(":").reverse()[1];
    return `${fileName}:${functionName}:${lineNumber}`;
  }

  get config() {
    return cloneDeep(this.#config);
  }
}
