import { Schema, type Document, model } from 'mongoose';

interface IUser extends Document {
    auth0Id: string,
    email: string,
    nickname: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    role: 'user' | 'landlord',
    createdAt: Date,
    updatedAt: Date,
}

const UserSchema = new Schema<IUser>({
    auth0Id: { type: String, required: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String },
    role: { type: String, required: true, enum: ['user', 'landlord'] }
},
{ timestamps: true });

const User = model<IUser>('User', UserSchema);
export { UserSchema, type IUser, User };
