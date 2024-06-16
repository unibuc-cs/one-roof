import { FilterQuery } from 'mongoose';
import { IListing, IReview } from '../models';

export interface ISearchStrategy {
	getQuery(searchParams: any): FilterQuery<IListing | IReview>;
}