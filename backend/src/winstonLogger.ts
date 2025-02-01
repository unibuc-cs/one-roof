import winston from 'winston';

export const winstonLogger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.colorize(),
		winston.format.printf(({level, message, timestamp}) => {
			return `${timestamp} ${level}: ${message}`;
		})
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({filename: 'logs/api.log'}),
		new winston.transports.File({filename: 'logs/error.log', level: 'error'})
	],
});
