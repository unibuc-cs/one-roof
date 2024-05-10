import { IAddress, ILocation } from '.';

export interface IReview {
	reviewerId: string,
	rating: number,
	content: string,
	location: ILocation,
	address: IAddress,
	areaFeedback: object,
	buildingFeedback: object,
	tags: string[],
	createdAt: Date,
	updatedAt: Date,
}
