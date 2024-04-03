import dotenv from 'dotenv';

dotenv.config();
export const config = {
    api: {
        baseUrl: `http://${process.env.API_HOST}:${process.env.API_PORT}`
    }
};
