import {NextFunction, Request, Response} from 'express';
import {winstonLogger} from '../winstonLogger';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const now = new Date().toISOString();
	const logMessage = `${now} - ${req.method} ${req.path} - IP: ${req.ip} - ${res.statusCode} - ${JSON.stringify(req.body)}`;

	winstonLogger.info(logMessage);
	next();
};

export default loggerMiddleware;