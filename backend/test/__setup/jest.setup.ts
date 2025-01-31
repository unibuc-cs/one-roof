import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	process.env.DEBUG = 'MongoMS:*';

	mongoServer = await MongoMemoryServer.create();

	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

afterEach(async () => {
	await mongoose.connection.dropDatabase(); // ✅ Clean database after each test
});

afterAll(async () => {
	if (mongoServer) {
		await mongoose.disconnect();
		await mongoServer.stop();
	}
});
