import express, {Express} from 'express';
import corsMiddleware from './middleware/cors';
import loggerMiddleware from './middleware/logger';
import {config} from './configure';
import {
	friendRouter,
	listingRouter,
	messageRouter,
	reviewRouter,
	searchRouter,
	userRouter,
	viewingRouter,
	notificationRouter,
	savedListRouter
} from './routes';

const app: Express = express();
app.set('port', config.port);

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