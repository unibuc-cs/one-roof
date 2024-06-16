import { IAddress, ILocation } from '.';

export interface IReview {
	_id: string,
	reviewerId: string,
	title: string,
	recommend: 1 | 2 | 3 | 4 | 5,
	description: string,
	livingSituation: string,
	location: ILocation,
	address: IAddress,
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
}
