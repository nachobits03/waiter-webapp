import winston, { createLogger, transports, format } from 'winston';

// Define the log levels and colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'white',
};

// Set up the Winston logger
const logger = createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.simple()
      ),
    }),
    new transports.File({ filename: './logs/app.log', level: 'info' }), // Change the filename as needed
  ],
});

// Apply colors to the log levels
winston.addColors(logColors);

export default logger;
