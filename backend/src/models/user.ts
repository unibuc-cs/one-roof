import {type Document, model, Schema} from 'mongoose';
import {IRoommatePreferences, RoommatePreferencesSchema} from './roommatePreferences';

interface IUser extends Document {
    clerkId: string,
    profilePicture: string,
    role: 'regularUser' | 'landlord',
    gender: 'male' | 'female' | 'other',
    onboardingStep: number,
    contactedUsers: string[],
    roommateQuiz?: IRoommatePreferences,
    favoriteListings: string[],
    savedLists: string[],
    viewedListings: string[],
    createdAt: Date,
    updatedAt: Date,
    friendRequests: string[],
    friends: string[],
}

type IUserWithClerk = IUser & {
    firstName: string,
    lastName: string,
    email: string,
    nickname: string,
};

export type IUserWithCompatibilityScore = {
    user: IUserWithClerk,
    compatibilityScore: number,
};

const UserSchema = new Schema<IUser>({
	clerkId: {type: String, required: true},
	profilePicture: {type: String},
	onboardingStep: {type: Number, required: true, default: 1, min: 1, max: 3},
	role: {type: String, required: true, enum: ['regularUser', 'landlord']},
	gender: {type: String, required: true, enum: ['male', 'female', 'other']},
	contactedUsers: [{type: String}],
    favoriteListings: [{type: String}],
    savedLists: [{type: String}],
    viewedListings: [{type: String}],
	friendRequests: [{ type: String }], // Incoming friend requests
	friends: [{ type: String }], // Established friendships
	roommateQuiz: {type: RoommatePreferencesSchema, default: null}
},
{timestamps: true});

const User = model<IUser>('User', UserSchema);
export {UserSchema, type IUser, type IUserWithClerk, User};
