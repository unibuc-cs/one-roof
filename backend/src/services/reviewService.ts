import { Review, IReview } from '../models';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const ReviewService = {
	createReview: async (reviewData: IReview): Promise<IReview | null> => {
		console.log('get here');
		const review = new Review(reviewData);
		try {
			const saved = await review.save();
			console.log('no errors', saved);
			return saved;
		} catch (error) {
			console.error(error);
			return null;
		}
	},

	getReviewById: async (id: string): Promise<IReview | null> => {
		return Review.findById(id).exec();
	},

	getAllReviews: async (filter: FilterQuery<IReview> = {}): Promise<IReview[]> => {
		return Review.find(filter).exec();
	},

	updateReviewById: async (id: string, updateData: UpdateQuery<IReview>): Promise<IReview | null> => {
		return Review.findByIdAndUpdate(id, updateData, { new: true }).exec();
	},

	deleteReviewById: async (id: string): Promise<IReview | null> => {
		return Review.findByIdAndDelete(id).exec();
	}
};
