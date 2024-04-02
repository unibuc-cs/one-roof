import { Schema, Document, model } from "mongoose";

interface IListing extends Document {
    landlordId: Schema.Types.ObjectId;
    title: string;
    description: string;
    photos: string[];
    address: string;
    price: number;
}

const ListingSchema = new Schema({
    landlordId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    photos: { type: [String], required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true }
});

const Listing = model<IListing>('Listing', ListingSchema);
export default Listing;