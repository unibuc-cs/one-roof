import dotenv from 'dotenv';

dotenv.config();

const getEnvironmentVariable = (key: string): string => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Environment variable ${key} not set`);
	}
	return value;
};

export const config = {
	mongo_uri: getEnvironmentVariable('MONGO_URI'),
	mongo_user: getEnvironmentVariable('MONGO_USER'),
	mongo_pass: getEnvironmentVariable('MONGO_PASS'),
	mongo_db_name: getEnvironmentVariable('MONGO_DB_NAME'),
	port: parseInt(getEnvironmentVariable('PORT')),
	clerk_secret_key: getEnvironmentVariable('CLERK_SECRET_KEY')
};
