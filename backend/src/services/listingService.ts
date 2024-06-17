import { Listing, IListing } from '../models';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const ListingService = {
	createListing: async (listingData: IListing): Promise<IListing | undefined> => {
		const listing = new Listing(listingData);
		try {
			const savedListing = await listing.save();
			return savedListing;
		} catch (error) {
			console.error(error);
			return undefined;
		}
		// try {
		// 	console.log('listing', listing);
		// 	const toReturn = listing.save();
		// 	return toReturn;
		// } catch (err) {
		// 	console.error(err);
		// 	return listing;
		// }
	},

	getListingById: async (id: string): Promise<IListing | null> => {
		return Listing.findById(id).exec();
	},

	getAllListings: async (filter: FilterQuery<IListing> = {}): Promise<IListing[]> => {
		return Listing.find(filter).exec();
	},

	updateListingById: async (id: string, updateData: UpdateQuery<IListing>): Promise<IListing | null> => {
		return Listing.findByIdAndUpdate(id, updateData, { new: true }).exec();
	},

	deleteListingById: async (id: string): Promise<IListing | null> => {
		return Listing.findByIdAndDelete(id).exec();
	}
};
