import { Schema, Document, model } from 'mongoose';
import { IUser, ILocation } from '../models'

interface IReview extends Document {
	reviewerId: string,
	title: string,
	recommend: 1 | 2 | 3 | 4 | 5,
	description: string,
	location: ILocation,
	areaFeedback: {
		transport: {
			publicTransport: number,
			carTransport: number,
			trafficCongestion: number,
			primaryTransportMode: string,
			additionalComments?: string,
		},
		demographics: {
			predominantDemographic: string,
		},
		safetyAndNoise: {
			noiseLevel: number,
			nighttimeSafety: number,
		},
		environmentalFactors: {
			cleanliness: number,
			greenSpaces: number,
			pollutionLevels: number,
		}
	},
	buildingFeedback: {
		pestIssues: {
			rodents: number,
			bugs: number,
			mosquitoes: number,
			additionalComments?: string,
		},
		utilityAvailability: {
			frequency: number,
			centralHeating: boolean,
			additionalComments?: string,
		},
		moldIssues: {
			severity: number,
			additionalComments?: string,
		},
		noiseInsulation: {
			rating: number,
			additionalComments?: string,
		},
		security: {
			rating: number,
			frequency: number,
			bodyguard: boolean,
			additionalComments?: string,
		},
		hvac: {
			summer: number,
			winter: number,
			ac: boolean,
			additionalComments?: string,
		},
		buildingFinishes: {
			quality: number,
			modernity: number,
			additionalComments?: string,
		},
	},
	createdAt?: Date,
	updatedAt?: Date,
}

const ReviewSchema = new Schema<IReview>({
	reviewerId: { type: String },
	title: { type: String, required: true },
	recommend: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
	description: { type: String, required: true },
	location: { type: Schema.Types.Mixed, required: true },
	areaFeedback: {
		transport: {
			publicTransport: { type: Number, required: true },
			carTransport: { type: Number, required: true },
			trafficCongestion: { type: Number, required: true },
			primaryTransportMode: { type: String, required: true },
			additionalComments: { type: String, default: '' },
		},
		demographics: {
			predominantDemographic: { type: String, required: true },
		},
		safetyAndNoise: {
			noiseLevel: { type: Number, required: true },
			nighttimeSafety: { type: Number, required: true },
		},
		environmentalFactors: {
			cleanliness: { type: Number, required: true },
			greenSpaces: { type: Number, required: true },
			pollutionLevels: { type: Number, required: true },
		}
	},
	buildingFeedback: {
		pestIssues: {
			rodents: { type: Number, required: true },
			bugs: { type: Number, required: true },
			mosquitoes: { type: Number, required: true },
			additionalComments: { type: String, default: '' },
		},
		utilityAvailability: {
			frequency: { type: Number, required: true },
			centralHeating: { type: Boolean, required: true },
			additionalComments: { type: String, default: '' },
		},
		moldIssues: {
			severity: { type: Number, required: true },
			additionalComments: { type: String, default: '' },
		},
		noiseInsulation: {
			rating: { type: Number, required: true },
			additionalComments: { type: String, default: '' },
		},
		security: {
			rating: { type: Number, required: true },
			frequency: { type: Number, required: true },
			bodyguard: { type: Boolean, required: true },
			additionalComments: { type: String, default: '' },
		},
		hvac: {
			summer: { type: Number, required: true },
			winter: { type: Number, required: true },
			ac: { type: Boolean, required: true },
			additionalComments: { type: String, default: '' },
		},
		buildingFinishes: {
			quality: { type: Number, required: true },
			modernity: { type: Number, required: true },
			additionalComments: { type: String, default: '' },
		},
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });


const Review = model<IReview>('Review', ReviewSchema);
export { ReviewSchema, type IReview, Review };
