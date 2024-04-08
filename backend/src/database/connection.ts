import mongoose from 'mongoose';
import { config } from '../configure';

const connect = async (): Promise<void> => {
	try {
		await mongoose.connect(config.mongo_uri);
		console.log('Database connected');
	} catch (error) {
		console.error('Database connection failed');
	}
};

export default connect;
