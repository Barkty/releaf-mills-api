import winston, { Logger as WinstonLogger } from 'winston';
// import WinstonNewrelicLogsTransport from 'winston-newrelic-logs-transport';
import DailyRotateFile from 'winston-daily-rotate-file';
import Env from '../shared/utils/envholder/env';
import dayjs from 'dayjs';

const logFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    const time = `${dayjs().format('YYYY-MM-DD, HH:mm:ss')}`;

    const { level, message, stack, code } = info;

    if (level == 'error') {
      return `[${level}] [${time}] ${code != null ? `[${code}] -> [${message}]` : message
      } ${code == null || code as number >= 500 ? `$[ERR_STACK] -> ${stack}` : ''}`;
    }

    return `[${time}] | [${level}] -> ${message}`;
  })
);

const infoLogRotationTransport = new DailyRotateFile({
  filename: './/logs//info',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '80d',
  level: 'info',
  extension: '.log'
});

const errorLogRotationTransport = new DailyRotateFile({
  filename: './/logs//error',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '80d',
  level: 'error',
  extension: '.log'
});

// const newRelicLogsTransport = new WinstonNewrelicLogsTransport({
//   licenseKey: process.env.NEW_RELIC_LICENSE_KEY ?? '',
//   apiUrl: 'https://log-api.newrelic.com/log/v1' // process.env.NEW_RELIC_API_URL,
// });

const loggerInfo = (env: string) => {
  let logger;
  switch (env) {
  case 'production':
    logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        infoLogRotationTransport,
        errorLogRotationTransport
        // newRelicLogsTransport
      ],
      exitOnError: false
    });
    break;
  case 'development':
    logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        infoLogRotationTransport,
        errorLogRotationTransport,
        new winston.transports.Console()
      ],
      exitOnError: false
    });
    break;
  case 'staging':
    logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        infoLogRotationTransport,
        errorLogRotationTransport
        // newRelicLogsTransport
      ],
      exitOnError: false
    });
    break;
  case 'test':
    logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        infoLogRotationTransport,
        errorLogRotationTransport,
        new winston.transports.File({
          filename: 'logs/error.log',
          maxsize: 500,
          format: logFormat
        })
      ],
      exitOnError: false
    });
    break;
  default:
    logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        infoLogRotationTransport,
        errorLogRotationTransport,
        new winston.transports.Console()
      ],
      exitOnError: false
    });
  }
  
  return logger;
};

const logger: WinstonLogger = loggerInfo(Env.get<string>('NODE_ENV'));

export default class Logger {
  constructor(private readonly defaultContext: string) { }

  public static error(err: any): void {
    logger.error(err);
  }

  public info(message: string | any, context?: string) {
    logger.info(message, { label: context ?? this.defaultContext });
  }

  public error(err: any): void {
    logger.error(err);
  }
}
