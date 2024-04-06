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
    port: parseInt(getEnvironmentVariable('PORT')),
    auth0: {
        domain: getEnvironmentVariable('AUTH0_DOMAIN'),
        audience: getEnvironmentVariable('AUTH0_AUDIENCE'),
        secret: getEnvironmentVariable('AUTH0_SECRET')
    }
};
