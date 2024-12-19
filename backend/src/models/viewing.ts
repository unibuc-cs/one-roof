import { Schema, type Document, model } from 'mongoose';

interface IViewing extends Document {
    userId: string,
    listingId: string,
    landlordId: string,
    viewingDate: Date,
    status: 'confirmed' | 'not confirmed' | 'rejected',
    createdAt: Date,
    updatedAt: Date,
}

const ViewingSchema = new Schema<IViewing>({
    userId: { type: String, required: true },
    listingId: { type: String, required: true },
    landlordId: { type: String, required: true },
    viewingDate: { type: Date, required: true },
    status: { type: String, required: false, enum: ['confirmed', 'not confirmed', 'rejected'] }
}, { timestamps: true });

const Viewing = model<IViewing>('Viewing', ViewingSchema);
export { ViewingSchema, type IViewing, Viewing };