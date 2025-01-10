import { Schema, type Document, model } from 'mongoose';
import { AddressSchema, LocationSchema, type IAddress, type ILocation, type IUser } from '../models';

interface IListing extends Document {
    landlordId: string,
    title: string,
    description: string | null,
    photos: string[],
    address: string,
    location: ILocation,
    type: 'studio' | 'house' | 'apartment',
    price: number,
    numberOfRooms ?: number,
    numberOfBathrooms ?: number,
    size: number,
	url ?: string,
    amenities: string[],
	views: Date[],
	external: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const ListingSchema = new Schema<IListing>({
	landlordId: { type: String, required: false },
	title: { type: String, required: true },
	description: { type: String, required: false },
	photos: { type: [String], required: true, default: []},
	address: { type: String, required: false },
	location: { type: LocationSchema, required: true },
	price: { type: Number, required: true },
	numberOfRooms: { type: Number, required: false },
	numberOfBathrooms: { type: Number, required: false },
	type: { type: String, enum: ['studio', 'house', 'apartment'], required: true },
	size: { type: Number, required: true },
	amenities: { type: [String], required: true, default: []},
	url: { type: String, required: false },
	views: {type: [Date], required: false, default: []},
	external: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Listing = model<IListing>('Listing', ListingSchema);
export { ListingSchema, type IListing, Listing };
