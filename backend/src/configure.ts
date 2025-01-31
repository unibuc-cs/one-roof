import dotenv from 'dotenv';
import path from 'path';

// load .env.development file ONLY when NOT running in GitHub Actions
if (!process.env.GITHUB_ACTIONS) {
	const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
	dotenv.config({path: path.resolve(__dirname, `../${envFile}`)});
}

// Utility function to fetch required environment variables
const getEnvironmentVariable = (key: string, defaultValue?: string): string => {
	const value = process.env[key] || defaultValue;
	return value || '';
};

export const config = {
	mongo_uri: getEnvironmentVariable('MONGO_URI'),
	mongo_user: getEnvironmentVariable('MONGO_USER', ''), // don't need for development
	mongo_pass: getEnvironmentVariable('MONGO_PASS', ''), // don't need for development
	mongo_db_name: getEnvironmentVariable('MONGO_DB_NAME'),
	port: parseInt(getEnvironmentVariable('PORT')),
	clerk_secret_key: getEnvironmentVariable('CLERK_SECRET_KEY'),
};