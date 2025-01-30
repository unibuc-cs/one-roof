import {ICoordinates} from '../models/roommatePreferences';
import * as turf from '@turf/turf';

type Area = ICoordinates[];

export const convertAreaToConvexPolygon = (area: Area) => {
	const coordinates = area.map(point => [point.longitude, point.latitude]);
	coordinates.push(coordinates[0]);
	const polygon = turf.polygon([coordinates]);
	return turf.convex(polygon); // convex hull of the polygon
};

export const doAnyAreasIntersect = (user1Areas: Area[], user2Areas: Area[]) => {
	for (const area1 of user1Areas) {
		const poly1 = convertAreaToConvexPolygon(area1);
		if (!poly1) {
			continue;
		}
		for (const area2 of user2Areas) {
			const poly2 = convertAreaToConvexPolygon(area2);
			if (!poly2) {
				continue;
			}
			if (turf.booleanIntersects(poly1, poly2)) {
				return true;
			}
		}
	}
	return false;
};

export interface QuizVector {
    numerical: number[], // Stores roommateType & costSharing
    preferences: Array<{ self: number, other: number }>, // List of preferences
}

export const euclideanDistanceBetweenQuizVectors = (quiz1: QuizVector, quiz2: QuizVector) => {
	const numericalDistanceSquared = quiz1.numerical.reduce((acc, val, i) => acc + Math.pow(val - quiz2.numerical[i], 2), 0);
	const preferenceDistanceSquared = quiz1.preferences.reduce((acc, val, i) => acc + Math.sqrt(Math.pow(val.self - quiz2.preferences[i].other, 2) + Math.pow(val.other - quiz2.preferences[i].self, 2)), 0);
	const actualDistance = Math.sqrt(numericalDistanceSquared + preferenceDistanceSquared);
	const maxPossibleDistance = Math.sqrt(quiz1.numerical.length + quiz1.preferences.length * 2); // Normalize by max possible value

	return 1 - (actualDistance / maxPossibleDistance); // Convert distance to compatibility score (1 = perfect match)
};