import { IListing } from '../models';

export const getCoordinatesFromListing = (listing: IListing) => {
	return {
		'latitude': listing.location.coordinates[1],
		'longitude': listing.location.coordinates[0]
	};
};