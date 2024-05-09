import { Location } from '../../models';

const BUCHAREST_COORDINATES = {
	latitude: 44.4268,
	longitude: 26.1025,
};

const generatePerimeterCoordinates = (center, radius, numPoints): number[][] => {
	const points: number[][] = [];
	for (let i = 0; i < numPoints; i++) {
		const angle = Math.random() * 2 * Math.PI;
		const randomRadius = Math.sqrt(Math.random()) * radius;
		const latitude = center.latitude + randomRadius * Math.cos(angle);
		const longitude = center.longitude + randomRadius * Math.sin(angle);
		points.push([latitude, longitude]);
	}
	return points;
};

const radius = 0.08;
const points: number[][] = generatePerimeterCoordinates(BUCHAREST_COORDINATES, radius, 30);

const LOCATIONS = points.map(point => new Location({
	type: 'Point',
	coordinates: point
}));

export { LOCATIONS };