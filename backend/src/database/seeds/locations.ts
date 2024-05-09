import { Location } from '../../models';

const BUCHAREST_COORDINATES = {
	latitude: 44.4268,
	longitude: 26.1025,
};

const generatePerimeterCoordinates = (center, radius, numPoints): number[][] => {
	const points: number[][] = [];
	for (let i = 0; i < numPoints; i++) {
		const angle = (i / numPoints) * 2 * Math.PI;
		const latitude = center.latitude + radius * Math.cos(angle);
		const longitude = center.longitude + radius * Math.sin(angle);
		points.push([longitude, latitude]);
	}
	return points;
};

const radius = 0.08;
const points: number[][] = generatePerimeterCoordinates(BUCHAREST_COORDINATES, radius, 50);

const LOCATIONS = points.map(point => new Location({
	type: 'Point',
	coordinates: point
}));

export { LOCATIONS };