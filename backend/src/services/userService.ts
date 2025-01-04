import {User, type IUser, IUserWithClerk} from '../models';
import {clerkClient} from '@clerk/clerk-sdk-node';
import {FriendshipRequest} from '../models/friendshipRequest';
import {Friendship} from '../models/friendship';

class UserService {
	public async createUser(clerkId: string, role: string, onboardingStep: number,  profilePicture?: string): Promise<IUser | undefined> {
		try {
			const parsedRole = role === 'Landlord' ? 'landlord' : 'regularUser';
			const user = new User({ clerkId, profilePicture, role: parsedRole, onboardingStep });
			try {
				return await user.save();
			} catch (err) {
				console.error(err);
			}
		} catch (error) {
			throw new Error('Error creating user');
		}
	}

	async getAllUsers(): Promise<IUser[]> {
		return User.find();
	}

	async getUserByClerkId(clerkId: string): Promise<IUser | null> {
		return User.findOne({clerkId} );
	}

	async getUserByUserId(userId: string): Promise<IUser | null> {
		return User.findOne({ _id: userId });
	}

	async getUserWithClerkDetails(clerkId: string): Promise<IUserWithClerk | null> {
		console.log('here with ', clerkId);
		const databaseUser = await this.getUserByClerkId(clerkId);
		console.log('db', databaseUser);
		if (!databaseUser) {
			return null;
		}
		const clerkUser = await clerkClient.users.getUser(clerkId);
		if (!clerkUser) {
			return null;
		}
		return {
			...databaseUser.toObject(),
			firstName: clerkUser.firstName,
			lastName: clerkUser.lastName,
			email: clerkUser.primaryEmailAddressId,
			nickname: clerkUser.username,
		} as IUserWithClerk;
	}

	async getUserWithClerkDetailsByUserId(userId: string): Promise<IUserWithClerk | null> {
		console.log('here with ', userId);
		const databaseUser = await this.getUserByUserId(userId);
		console.log('aicea');
		if (!databaseUser) {
			return null;
		}
		const clerkUser = await clerkClient.users.getUser(databaseUser.clerkId);
		if (!clerkUser) {
			return null;
		}
		return {
			...databaseUser.toObject(),
			firstName: clerkUser.firstName,
			lastName: clerkUser.lastName,
			email: clerkUser.primaryEmailAddressId,
			nickname: clerkUser.username,
		} as IUserWithClerk;
	}

	async updateUserByClerkId(clerkId: string, update: Partial<IUser>): Promise<IUser | null> {
		return User.findOneAndUpdate({ clerkId }, update, { new: true });
	}

	async deleteUserByClerkId(clerkId: string): Promise<IUser | null> {
		return User.findOneAndDelete({ clerkId });
	}
}

export const userService = new UserService();