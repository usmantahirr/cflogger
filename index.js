const createDebug = require('debug');
const log4js = require('log4js');
const chalk = require('chalk');

const TYPE = {
  ERROR: 0,
  LOG: 1,
  WARN: 2
};

function configureFileLogger(module) {
  log4js.configure({
    "appenders": [
      {
        "type": "clustered",
        "appenders": [
          {
            type: "file",
            filename: "logs/test.log",
            maxLogSize: 10*1024*1024, // = 10Mb
            numBackups: 5, // keep five backup files
            compress: true, // compress the backups
            encoding: 'utf-8',
            mode: parseInt('0640', 8),
            flags: 'w+',
            category: 'log'
          },
          {
            type: "dateFile",
            filename: "logs/all.log",
            pattern: "yyyy-MM-dd-hh",
            compress: true
          },
          {
            type: "stdout"
          }
        ]
      }
    ]
  });

  return log4js.getLogger(module);
}

class Logger {
  constructor(module) {
    this.module = module;
    // this.fileLogger = configureFileLogger(module);
  }

  debug(func) {
    return createDebug(`${new Date().toUTCString()} [${this.module}][${func}] ${chalk.green.underline.bold('LOG')} `)
  }

  log(message, calle) {
    this._print(message, calle, TYPE.LOG);
  }

  warn(message, calle) {
    this._print(message, calle, TYPE.WARN);
  }

  error(message, calle) {
    this._print(message, calle, TYPE.ERROR);
  }

  _print(message, func, logLevel) {
    if (!func) {
      func = '-';
    }

    const date = new Date().toUTCString();

    if (logLevel === TYPE.ERROR) {

      // this.fileLogger.error(message);
      createDebug(`${chalk.red.inverse(date)} [${this.module}][${func}] ${chalk.red.underline.bold('ERROR')} `)(message);      

    } else if (logLevel === TYPE.WARN) {

      // this.fileLogger.warn(message);
      createDebug(`${chalk.yellow.inverse(date)} [${this.module}][${func}] ${chalk.yellow.underline.bold('WARN')} `)(message);

    } else {

      // this.fileLogger.log(message);
      createDebug(`${date} [${this.module}][${func}] ${chalk.green.underline.bold('LOG')} `)(message);

    }

  }
}

module.exports = Logger;
