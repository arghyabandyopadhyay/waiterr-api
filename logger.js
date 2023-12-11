const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' , format: winston.format.json() }), // Log errors to error.log
    new winston.transports.File({ filename: 'combined.log', format: winston.format.json() }) // Log everything else to combined.log
  ]
});

// If you want to log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.json()
  }));
}

module.exports = logger;
