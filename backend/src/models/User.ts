import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    auth0Id: string;
    email: string;
    nickname: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'landlord';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'landlord'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;