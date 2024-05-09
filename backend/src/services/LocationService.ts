import { ILocation, Location } from '../models';

class LocationService {
	async getAllLocations(): Promise<ILocation[]> {
		return Location.find();
	}
}

export const locationService: LocationService = new LocationService();