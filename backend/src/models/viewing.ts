import { Schema, type Document, model } from 'mongoose';

interface IViewing extends Document {
    userId: string,
    listingId: string,
    title: string,
    address: string,
    landlordId: string,
    viewingDate: Date,
    status: 'confirmed' | 'not confirmed',
    createdAt: Date,
    updatedAt: Date,
}

const ViewingSchema = new Schema<IViewing>({
    userId: { type: String, required: true },
    listingId: { type: String, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    landlordId: { type: String, required: true },
    viewingDate: { type: Date, required: true },
    status: { type: String, required: false, enum: ['confirmed', 'not confirmed'] },
    createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Viewing = model<IViewing>('Viewing', ViewingSchema);
export { ViewingSchema, type IViewing, Viewing };