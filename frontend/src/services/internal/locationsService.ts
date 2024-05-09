import { callApi } from '../../utils/apiWrapper';

export const locationsService = {
	async getAllLocations() {
		return callApi('locations');
	},

	async getAllLocationCoordinates() {
		const locations = await this.getAllLocations();
		return locations.map((location) => {
			return {
				'latitude': location.coordinates[0],
				'longitude': location.coordinates[1]
			};
		});
	}
};

