import { type IUser, type ILocation, type IAddress } from '../models';
import { Schema, model, type Document } from 'mongoose';

interface IReview extends Document {
    reviewerId: IUser['_id'],
    rating: number,
    content: string,
    locationId: ILocation['_id'],
    addressId?: IAddress['_id'],
    areaFeedback: object, // TODO: define questions for area feedback
    buildingFeedback: object, // TODO: define questions for building feedback
    tags: [string],
    createdAt: Date,
    updatedAt: Date,
}

const ReviewSchema = new Schema<IReview>({
	reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	rating: { type: Number, required: true },
	content: { type: String, required: true },
	locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
	addressId: { type: Schema.Types.ObjectId, ref: 'Address' },
	areaFeedback: { type: Schema.Types.Mixed, required: true },
	buildingFeedback: { type: Object, required: true },
	tags: { type: [String] }
}, { timestamps: true });

const Review = model<IReview>('Review', ReviewSchema);
export { ReviewSchema, type IReview, Review };
