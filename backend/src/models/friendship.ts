import mongoose, { Schema, Document } from 'mongoose';

interface IFriendship extends Document {
    firstUser: string,
    secondUser: string,
}

const FriendshipSchema = new Schema<IFriendship>({
	firstUser: { type: String, required: true }, //sent the request
	secondUser: { type: String, required: true }, //received the request
});

const Friendship = mongoose.model<IFriendship>('Friendship', FriendshipSchema);
export {FriendshipSchema, IFriendship, Friendship};