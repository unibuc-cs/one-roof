import { API_PORT, API_HOST, AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env';

export const config = {
    api: {
        baseUrl: `http://${API_HOST}:${API_PORT}`
    },
    auth0: {
        clientId: AUTH0_CLIENT_ID,
        domain: AUTH0_DOMAIN
    }
};
