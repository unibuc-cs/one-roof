import mongoose from 'mongoose';
import {config} from '../configure';

const connect = async (): Promise<void> => {
	const {mongo_uri, mongo_user, mongo_pass, mongo_db_name} = config;
	try {
		if (!mongo_user || !mongo_pass || mongo_user === '' || mongo_pass === '') {
			await mongoose.connect(mongo_uri);
		} else {
			await mongoose.connect(mongo_uri, {
				user: mongo_user,
				pass: mongo_pass,
				dbName: mongo_db_name,
				authSource: 'admin'
			});
			console.log('Remote database connected');
		}
	} catch (error) {
		console.error('Database connection failed');
	}
};

export default connect;
