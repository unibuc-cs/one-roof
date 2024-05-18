export interface ISearchParams {
	region: {
		latitude: number,
		longitude: number,
		latitudeDelta: number,
		longitudeDelta: number,
	},
	filters: {
		roomType: 'studio' | 'apartment' | 'house',
		priceRange: { min: 100, max: 3000 },
		bedrooms: 0 | 1 | 2 | 3 | 4,
		bathrooms: 0 | 1 | 2 | 3,
		amenities: [],
		shouldSearch: false,
	},
}