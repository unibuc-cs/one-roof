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

	async createFriendRequest(senderId: string, receiverId: string) {
		// Check if users are already friends
		const existingFriendship = await Friendship.findOne({
			$or: [
				{ firstUser: senderId, secondUser: receiverId },
				{ firstUser: receiverId, secondUser: senderId },
			],
		});

		if (existingFriendship) {
			throw new Error('Users are already friends');
		}

		// Check if there is already a pending friend request between the users
		const existingRequest = await FriendshipRequest.findOne({
			userRequested: senderId,
			userPending: receiverId,
		});

		if (existingRequest) {
			throw new Error('Friend request already sent');
		}

		// Create the new friend request
		const newRequest = new FriendshipRequest({
			userRequested: senderId,
			userPending: receiverId,
			status: 'pending'
		});

		await newRequest.save(); // Save the new friend request to the database

		return newRequest; // Return the created friend request
	}

	async acceptFriendRequest(requestId: string, userId: string) {
		// Find the friend request by ID
		const friendRequest = await FriendshipRequest.findById(requestId);

		if (!friendRequest) {
			throw new Error('Friend request not found');
		}

		// Check if the user is the one pending the request
		if (friendRequest.userPending !== userId) {
			throw new Error('You are not the pending user for this request');
		}

		// Create a new Friendship record
		const friendship = new Friendship({
			firstUser: friendRequest.userRequested,
			secondUser: friendRequest.userPending,
		});

		// Save the friendship
		await friendship.save();

		// Delete the friend request as it is now accepted
		friendRequest.status = 'accepted';
		await friendRequest.save();
		return friendship; // Return the created friendship
	}

	// Method to reject a Friend Request
	async rejectFriendRequest(requestId: string) {
		// Find the friend request by ID
		const friendRequest = await FriendshipRequest.findById(requestId);

		if (!friendRequest) {
			throw new Error('Friend request not found');
		}

		// Set the status of the request to rejected (you can also delete it, depending on your needs)
		friendRequest.status = 'rejected';
		await friendRequest.save();

		return friendRequest; // Return the updated request
	}
}

export const userService = new UserService();