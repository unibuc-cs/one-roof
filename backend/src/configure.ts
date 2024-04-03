import dotenv from 'dotenv';

dotenv.config();

const getEnvirontmentVariable = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} not set`);
    }
    return value;
};

export const config = {
    MONGO_URI: getEnvirontmentVariable('MONGO_URI'),
    PORT: parseInt(getEnvirontmentVariable('PORT'))
};
