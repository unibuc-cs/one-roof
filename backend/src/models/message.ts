import { Schema, type Document, model, type SchemaDefinitionProperty } from 'mongoose';
import { type IUser, type IListing, type IReview } from '../models';

interface IMessage extends Document {
    senderId: string,
    receiverId: string,
    content: string,
    isRead: boolean,
    referenceId: SchemaDefinitionProperty<IListing['_id']> | SchemaDefinitionProperty<IReview['_id']>|null,
    type: 'listing' | 'review'|null,
    createdAt: Date,
    updatedAt: Date,
}

const MessageSchema = new Schema<IMessage>({
	senderId: { type: String },
	receiverId: { type: String },
	content: { type: String, required: true },
	isRead: { type: Boolean, required: true },
	referenceId: { type: Schema.Types.ObjectId, required: false },
	type: { type: String, required: false, enum: ['listing', 'review'] }
}, { timestamps: true });

const Message = model<IMessage>('Message', MessageSchema);
export { MessageSchema, type IMessage, Message };
