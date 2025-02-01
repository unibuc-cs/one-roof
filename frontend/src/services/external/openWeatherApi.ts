import axios from 'axios';

const BUCURESTI_COORDS = { lat: 44.4268, lon: 26.1025 }; // Bucharest center

interface Point {
	lat: number,
	lon: number,
}

interface DataPoint {
	latitude: number,
	longitude: number,
	weight: number,
}

function generateRandomPoints(center: Point, radiusKm: number, count: number): Point[] {
	const points: Point[] = [];
	const radiusDegrees = radiusKm / 111.32; // Approximate conversion from km to degrees

	for (let i = 0; i < count; i++) {
		const angle = Math.random() * 2 * Math.PI; // Random angle
		const distance = Math.sqrt(Math.random()) * radiusDegrees; // Random distance within the radius

		const lat = center.lat + distance * Math.cos(angle);
		const lon = center.lon + distance * Math.sin(angle);

		points.push({ lat, lon });
	}

	return points;
}

export async function fetchAirPollutionData(): Promise<DataPoint[]> {
	const BUCURESTI_COORDS = { lat: 44.4268, lon: 26.1025 }; // Bucharest coordinates
	const RADIUS_KM = 10; // Radius in kilometers
	const POINT_COUNT = 100; // Number of points to generate

	try {
		// Generate 50 random points within the radius
		const points = generateRandomPoints(BUCURESTI_COORDS, RADIUS_KM, POINT_COUNT);

		// Fetch air pollution data for each point
		const pollutionData = await Promise.all(
			points.map(async (point) => {
				const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${point.lat}&lon=${point.lon}&appid=${process.env.OPENWEATHER_API_KEY}`;
				const response = await axios.get(url);
				const pm2_5 = response.data.list[0]?.components.pm2_5 || 0; // Default to 0 if no data
				return {
					latitude: point.lat,
					longitude: point.lon,
					weight: pm2_5, // PM2.5 levels as weight
				};
			})
		);

		return pollutionData;
	} catch (error) {
		console.error('Error fetching air pollution data:', error);
		return [];
	}
}

export async function fetchCrimeData() {
	try {
		const response = await axios.get('https://data.gov.ro/api/crime-bucharest'); // 🔥 Replace with actual API if available
		return response.data.map((crime: any) => ({
			latitude: crime.lat,
			longitude: crime.lon,
			weight: crime.severity || 50, // Crime severity as weight
		}));
	} catch (error) {
		console.error('Error fetching crime data:', error);
		return [];
	}
}

export async function fetchTrafficNoiseData() {
	try {
		const response = await axios.get('https://eea-noise-api.example.com/data'); // 🔥 Replace with actual EEA API
		return response.data.map((noise: any) => ({
			latitude: noise.lat,
			longitude: noise.lon,
			weight: noise.db_level || 70, // Noise level as weight
		}));
	} catch (error) {
		console.error('Error fetching traffic noise data:', error);
		return [];
	}
}
