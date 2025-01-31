import { Schema, type Document, model } from 'mongoose';

interface IUser extends Document {
    clerkId: string,
    profilePicture: string,
    role: 'regularUser' | 'landlord',
    gender: 'male' | 'female' | 'other',
    onboardingStep: number,
    contactedUsers: string[],
    roommateQuiz?: IRoommatePreferences,
    pushTokens: string[],
    allowedNotifications: string[],
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
	friendRequests: [{ type: String }], // Incoming friend requests
	friends: [{ type: String }], // Established friendships
	roommateQuiz: {type: RoommatePreferencesSchema, default: null}
    pushTokens: [{ type: String}],
    allowedNotifications: [{ type: String}],
},
{timestamps: true});

const User = model<IUser>('User', UserSchema);
export {UserSchema, type IUser, type IUserWithClerk, User};
