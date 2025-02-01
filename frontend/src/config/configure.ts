
console.log(`http://${process.env.API_HOST}:${process.env.API_PORT}`);

export const config = {
	api: {
		baseUrl: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
	},
	auth0: {
		clientId: process.env.AUTH0_CLIENT_ID,
		domain: process.env.AUTH0_DOMAIN,
	},
	googleMaps: {
		apiKey: process.env.GOOGLE_MAPS_API_KEY,
	},
};
