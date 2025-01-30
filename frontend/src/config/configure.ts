import { API_PORT, API_HOST, AUTH0_DOMAIN, AUTH0_CLIENT_ID, GOOGLE_MAPS_API_KEY } from '@env';

console.log(`http://${API_HOST}:${API_PORT}`)

export const config = {
	api: {
		baseUrl: `http://${API_HOST}:${API_PORT}`
	},
	auth0: {
		clientId: AUTH0_CLIENT_ID,
		domain: AUTH0_DOMAIN
	},
	googleMaps: {
		apiKey: GOOGLE_MAPS_API_KEY
	}
};

