import mongoose, {Schema} from 'mongoose';

interface IFriendshipRequest extends Document {
    userRequested: string, // User ID of sender
    userPending: string, // User ID of receiver
    time: Date,
	status: string,
}

const FriendshipRequestSchema = new Schema<IFriendshipRequest>({
	userRequested: { type: String, required: true },
	userPending: { type: String, required: true },
	time: { type: Date, default: Date.now },
	status: { type: String, required: true },
});

export const FriendshipRequest = mongoose.model<IFriendshipRequest>(
	'FriendshipRequest',
	FriendshipRequestSchema
);
