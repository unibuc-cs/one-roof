import { USERS, LISTINGS, REVIEWS } from './seeds';
import { Listing, Review } from '../models';

const seedUsers = async () => {
	for (const user of USERS) {
		await user.save();
	}
};

const seedListings = async () => {
	const listingsNum = await Listing.countDocuments();
	if (!listingsNum) {
		for (const listing of LISTINGS) {
			await listing.save();
		}
	}
};

const seedReviews = async () => {
	const reviewsNum = await Review.countDocuments();
	if (!reviewsNum) {
		for (const review of REVIEWS) {
			await review.save();
		}
	}
}

export const seedDatabase = async () => {
	try {
		await seedUsers();
		await seedListings();
		await seedReviews();
		console.log('Database seeding successful');
	} catch (error) {
		console.error(`Database seeding failed ${error}`);
	}
};
