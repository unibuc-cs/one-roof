import express, { Express } from 'express';
import corsMiddleware from './middleware/cors';
import loggerMiddleware from './middleware/logger';
import { usersRouter } from './controllers/UserController';
import { config } from './configure';
import { locationsRouter } from './controllers/LocationController';

const app: Express = express();

app.set('port', config.port);

app.use(express.json());
app.use(loggerMiddleware);
app.use(corsMiddleware);

app.get('/api', (req, res) => {
	res.send('Hello World!');
});

app.use('/api/users', usersRouter);

app.use('/api/locations', locationsRouter);

export default app;