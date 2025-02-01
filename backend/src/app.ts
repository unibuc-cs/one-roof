import express, {Express} from 'express';
import corsMiddleware from './middleware/cors';
import loggerMiddleware from './middleware/logger';
import {config} from './configure';
import {
	friendRouter,
	listingRouter,
	messageRouter,
	notificationRouter,
	reviewRouter,
	savedListRouter,
	searchRouter,
	userRouter,
	viewingRouter
} from './routes';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app: Express = express();
app.set('port', config.port);

app.use(helmet());

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 1000, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, // Return rate limit info in headers
	legacyHeaders: false, // Disable legacy `X-RateLimit-*` headers
});
app.use(limiter);

app.use(express.json());
app.use(loggerMiddleware);
app.use(corsMiddleware);

app.get('/api', (req, res) => {
	res.send('Hello World!');
});

app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/listings', listingRouter);
app.use('/api/search', searchRouter);
app.use('/api/messages', messageRouter);
app.use('/api/savedlists', savedListRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/friends', friendRouter);
app.use('/api/viewings', viewingRouter);

export default app;