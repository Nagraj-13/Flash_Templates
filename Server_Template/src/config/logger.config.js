import winston from "winston";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { resolve } from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import morgan from "morgan";
import chalk from "chalk";

class Logger {
  constructor(metaUrl) {
    this.logDir = "logs";
    this.setupLogDirectory();
    
    const root = resolve("./");
    this.filePath = fileURLToPath(new URL(metaUrl)).replace(root, "");

    this.logger = this.createLogger();
    this.httpLogger = this.createHttpLogger();
  }

  setupLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  createLogger() {
    const logFormat = winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      winston.format.printf(({ timestamp, level, message, stack, file }) => {
        return `${timestamp} [${level.toUpperCase()}] [${file}]: ${stack || message}`;
      })
    );

    return winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
          colors: {
            info: "green",
            warn: "yellow",
            error: "red",
            debug: "cyan",
          },
        }),
        logFormat
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          filename: path.join(this.logDir, "app-%DATE%.log"),
          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
          level: "info",
        }),
        new DailyRotateFile({
          filename: path.join(this.logDir, "error-%DATE%.log"),
          datePattern: "YYYY-MM-DD",
          level: "error",
          maxFiles: "30d",
        }),
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: path.join(this.logDir, "exceptions.log") }),
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: path.join(this.logDir, "rejections.log") }),
      ],
    });
  }

  createHttpLogger() {
    const getStatusColor = (status) => {
      if (status >= 500) return chalk.red(status);
      if (status >= 400) return chalk.yellow(status);
      if (status >= 300) return chalk.cyan(status);
      return chalk.green(status);
    };
  
    return morgan((tokens, req, res) => {
      const status = getStatusColor(tokens.status(req, res));
      return [
        chalk.cyan("[HTTP]:"),
        chalk.gray(tokens["remote-addr"](req, res)),
        "- -",
        chalk.green(`[${tokens.date(req, res, "clf")}]`),
        `"${chalk.magenta(tokens.method(req, res))} ${chalk.blue(tokens.url(req, res))} ${tokens["http-version"](req, res)}"`,
        `--status [${status}]`,
        tokens.res(req, res, "content-length") || "-",
        `"${chalk.gray(tokens.referrer(req, res) || "-")}"`,
        `"${chalk.white(tokens["user-agent"](req, res))}"`
      ].join(" ");
    }, {
      stream: { write: (message) => this.logger.info({ message: message.trim(), file: "HTTP" }) },
    });
  }
  
  log(level, message) {
    this.logger.log({ level, message, file: this.filePath });
  }

  info(message) {
    this.log("info", message);
  }

  error(message) {
    this.log("error", message);
  }

  warn(message) {
    this.log("warn", message);
  }
}

export default (metaUrl) => new Logger(metaUrl);
