import { connect, seedDatabase } from './database';
import app from './app';
import {Server} from "socket.io";
import cors from "./middleware/cors";
import {createServer} from "node:http";
import corsMiddleware from "./middleware/cors";

const port = app.get('port');

const server = createServer(app);
const io = new Server(server, {
	cors: {origin: '*'}
});

io.on('connection', (socket) => {
	console.log('Client connected');

})

connect().then(() => {
	console.log('Database connected');
	seedDatabase().then(() => {
		console.log('Database seeded');
		server.listen(port, () => {
			console.log(`Server is running at http://localhost:${port}`);
		});
	}).catch((error) => {
		console.error('Database seeding failed');
	});
});
