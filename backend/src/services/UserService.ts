import {User, type IUser} from '../models';
class UserService {
	public async createUser(user: IUser): Promise<IUser> {
		try {
			return await user.save();
		} catch (error) {
			throw new Error('Error creating user');
		}
	}
	async getAllUsers(): Promise<IUser[]> {
		return User.find();
	}
	async getUserByClerkId(clerkId: string): Promise<IUser | null> {
		return User.findOne({ clerkId });
	}

	async updateUserByClerkId(clerkId: string, update: Partial<IUser>): Promise<IUser | null> {
		return User.findOneAndUpdate({ clerkId }, update, { new: true });
	}

	async deleteUserByClerkId(clerkId: string): Promise<IUser | null> {
		return User.findOneAndDelete({ clerkId });
	}
}

export const userService = new UserService();
