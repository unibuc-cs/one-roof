import {Document, model, Schema} from 'mongoose';

interface ICoordinates {
    latitude: number,
    longitude: number,
}

interface IPriceRange {
    lowerBound: number,
    upperBound: number,
}

interface IYesNoPreference {
    self: boolean,  // Does the user do this?
    other: boolean, // Does the user tolerate this in a roommate?
}

interface IPreference {
    self: number,  // User's own characteristic
    other: number, // What they expect from a roommate
}

interface IRoommatePreferences extends Document {
    userId: string,
    dateTaken: Date,
    preferredAreas: ICoordinates[][],
    price: IPriceRange,
    allowedGenders: 'male' | 'female' | 'both',
    smoking: IYesNoPreference,
    pets: IYesNoPreference,
    costSharing: boolean,
    roommateType: 'student' | 'working' | 'either',
    preferences: {
        morningPerson: IPreference,
        cleanliness: IPreference,
        sociability: IPreference,
        conversations: IPreference,
        guest: IPreference,
        noise: IPreference,
    },
}

const CoordinatesSchema = new Schema<ICoordinates>({
	latitude: {type: Number, required: true},
	longitude: {type: Number, required: true},
});

const PriceRangeSchema = new Schema<IPriceRange>({
	lowerBound: {type: Number, required: true},
	upperBound: {type: Number, required: true},
});

const YesNoPreferenceSchema = new Schema<IYesNoPreference>({
	self: {type: Boolean, required: true},
	other: {type: Boolean, required: true},
});

const PreferenceSchema = new Schema<IPreference>({
	self: {type: Number, required: true, min: 1, max: 5},
	other: {type: Number, required: true, min: 1, max: 5},
});

const RoommatePreferencesSchema = new Schema<IRoommatePreferences>({
	userId: {type: String, required: true, index: true},
	dateTaken: {type: Date, default: Date.now},
	preferredAreas: {type: [[CoordinatesSchema]], required: true},
	price: {type: PriceRangeSchema, required: true},
	allowedGenders: {type: String, enum: ['male', 'female', 'both'], required: true, default: 'both'},
	smoking: {type: YesNoPreferenceSchema, required: true},
	pets: {type: YesNoPreferenceSchema, required: true},
	costSharing: {type: Boolean, required: true},
	roommateType: {type: String, enum: ['student', 'working', 'either'], required: true, default: 'either'},
	preferences: {
		morningPerson: {type: PreferenceSchema, required: true},
		cleanliness: {type: PreferenceSchema, required: true},
		sociability: {type: PreferenceSchema, required: true},
		conversations: {type: PreferenceSchema, required: true},
		guest: {type: PreferenceSchema, required: true},
		noise: {type: PreferenceSchema, required: true},
	},
});

export const RoommatePreferences = model<IRoommatePreferences>('RoommatePreferences', RoommatePreferencesSchema);
