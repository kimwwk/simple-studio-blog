import fs from "fs";

class Logger {
  constructor(logLevel, logFilePath = "") {
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
    this.logLevel = logLevel;

    const timestamp = this.getCurrentTimestamp();
    const logFileName = `my_log_file_${timestamp}.log`;
    this.logFile = logFilePath + logFileName;
  }

  log(level, ...messages) {
    if (this.levels[level] <= this.levels[this.logLevel]) {
      const logMessage = `[${level.toUpperCase()}] ${messages.join(" ")} \n\n`;
      console.log(logMessage);

      fs.appendFile(this.logFile, logMessage, (err) => {
        if (err) {
          console.error(`Failed to write log message to file: ${err}`);
        }
      });
    }
  }

  getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    return `${year}${month}${day}_${hours}${minutes}${seconds}_${milliseconds}`;
  }

  error(...messages) {
    this.log("error", ...messages);
  }

  warn(...messages) {
    this.log("warn", ...messages);
  }

  info(...messages) {
    this.log("info", ...messages);
  }

  debug(...messages) {
    this.log("debug", ...messages);
  }
}

const logLevel = process.env.LOG_LEVEL || "debug";
const loggerInstance = new Logger(logLevel, process.env.LOG_FILE_PATH);

export default loggerInstance;
