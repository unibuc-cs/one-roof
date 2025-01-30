export interface ICoordinates {
	latitude: number,
	longitude: number,
}

export interface IPriceRange {
	lowerBound: number,
	upperBound: number,
}

export interface IYesNoPreference {
	self: boolean, // Does the user do this?
	other: boolean, // Does the user tolerate this in a roommate?
}

export interface IPreference {
	self: number, // User's own characteristic
	other: number, // What they expect from a roommate
}

export interface IRoommatePreferences {
	// deal breakers:
	preferredAreas: ICoordinates[][],
	price: IPriceRange,
	allowedGenders: 'male' | 'female' | 'both',
	smoking: IYesNoPreference,
	pets: IYesNoPreference,
	// optionals:
	costSharing: boolean,
	roommateType: 'student' | 'working' | 'either',
	preferences: {
		morningPerson: IPreference,
		cleanliness: IPreference,
		sociability: IPreference,
		conversations: IPreference,
		guests: IPreference,
		noise: IPreference,
	},
}
