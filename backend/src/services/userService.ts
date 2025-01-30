import {type IUser, IUserWithClerk, IUserWithCompatibilityScore, User} from '../models';
import {clerkClient} from '@clerk/clerk-sdk-node';
import {FriendshipRequest} from '../models/friendshipRequest';
import {Friendship} from '../models/friendship';
import {compatibilityService} from './compatibilityService';

class UserService {
	public async createUser(clerkId: string, role: string, onboardingStep: number, profilePicture?: string): Promise<IUser | undefined> {
		try {
			const parsedRole = role === 'Landlord' ? 'landlord' : 'regularUser';
			const gender = Math.random() < 0.5 ? 'male' : 'female';
			const user = new User({clerkId, gender, profilePicture, role: parsedRole, onboardingStep});
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

	async getAllUsersWithClerk(): Promise<IUserWithClerk[]> {
		const allUsers = await this.getAllUsers();
		return await Promise.all(allUsers.map(async (user) => {
			const clerkUser = await clerkClient.users.getUser(user.clerkId);
			return {
				...user.toObject(),
				firstName: clerkUser.firstName,
				lastName: clerkUser.lastName,
				email: clerkUser.primaryEmailAddressId,
				nickname: clerkUser.username,
			} as IUserWithClerk;
		}));
	}

	async getUserByClerkId(clerkId: string): Promise<IUser | null> {
		return User.findOne({clerkId});
	}

	async getUserByUserId(userId: string): Promise<IUser | null> {
		return User.findOne({_id: userId});
	}

	async getUserWithClerkDetails(clerkId: string): Promise<IUserWithClerk | null> {
		const databaseUser = await this.getUserByClerkId(clerkId);
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

	async getAllUsersWithClerkDetail(): Promise<IUserWithClerk[]> {
		const allUsers = await this.getAllUsers();
		const usersWithClerkDetails: IUserWithClerk[] = [];

		for (const user of allUsers) {
			const userId = user._id;
			try {
				const databaseUser = await this.getUserByUserId(userId);
				if (!databaseUser) {
					continue;
				}

				const clerkUser = await clerkClient.users.getUser(databaseUser.clerkId);
				if (!clerkUser) {
					continue;
				}

				usersWithClerkDetails.push({
					...databaseUser.toObject(),
					firstName: clerkUser.firstName,
					lastName: clerkUser.lastName,
					email: clerkUser.primaryEmailAddressId,
					nickname: clerkUser.username,
				} as IUserWithClerk);
			} catch (error) {
				console.error(`Error fetching user ${userId}:`, error);
			}
		}

		return usersWithClerkDetails;
	}


	async updateUserByClerkId(clerkId: string, update: Partial<IUser>): Promise<IUser | null> {
		return User.findOneAndUpdate({clerkId}, update, {new: true});
	}

	async deleteUserByClerkId(clerkId: string): Promise<IUser | null> {
		return User.findOneAndDelete({clerkId});
	}

	async submitRoommateQuiz(userId: string, roommateQuizValues: any): Promise<void> {
		const user = await this.getUserByClerkId(userId);
		if (!user) {
			throw new Error('User not found');
		}
		// just update the roommateQuiz with mongo api
		user.roommateQuiz = roommateQuizValues;
		await user.save();
	}

	async getCompatibleRoommates(userId: string): Promise<IUserWithCompatibilityScore[]> {
		const user: IUser | null = await this.getUserWithClerkDetails(userId);
		if (!user) {
			throw new Error('User not found');
		}

		const allUsers = await this.getAllUsersWithClerk();
		const usersWithScores: IUserWithCompatibilityScore[] = allUsers
			.filter((otherUser) => otherUser.clerkId !== userId)
			.map((otherUser: IUserWithClerk) => ({
				user: otherUser,
				compatibilityScore: compatibilityService.getCompatibilityScore(user, otherUser)
			}))
			.filter((userWithScore) => userWithScore.compatibilityScore > 0);

		console.log('usersWithScores', usersWithScores);

		// sort in decreasing order
		return usersWithScores
			.sort((a, b) => b.compatibilityScore - a.compatibilityScore) // Sort descending
			.slice(0, 5); // Take top 5 users
	}
}

export const userService = new UserService();