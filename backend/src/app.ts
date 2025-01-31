import express, { Express } from 'express';
import corsMiddleware from './middleware/cors';
import loggerMiddleware from './middleware/logger';
import {
	friendRouter,
	viewingRouter
} from './routes';
import { config } from './configure';
import {userRouter, reviewRouter, listingRouter, searchRouter, messageRouter, notificationRouter} from './routes';

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
app.use('/api/notifications', notificationRouter);
app.use('/api/viewings', viewingRouter);
app.use('/api/friends', friendRouter);

export default app;