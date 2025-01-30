import {FriendshipRequest, IFriendshipRequest} from '../models/friendshipRequest';
import {Friendship} from '../models/friendship';

class FriendService {

	async createFriendRequest(senderId: string, receiverId: string) {
		// Check if users are already friends
		const existingFriendship = await Friendship.findOne({
			$or: [
				{firstUser: senderId, secondUser: receiverId},
				{firstUser: receiverId, secondUser: senderId},
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

	async acceptFriendRequest(requestId: string) {
		// Find the friend request by ID
		const friendRequest = await FriendshipRequest.findById(requestId);

		if (!friendRequest) {
			throw new Error('Friend request not found');
		}

		// Create a new Friendship record
		const friendship = new Friendship({
			firstUser: friendRequest.userRequested,
			secondUser: friendRequest.userPending,
		});

		// Save the friendship
		await friendship.save();

		await FriendshipRequest.updateOne(
			{_id: requestId},
			{$set: {status: 'accepted'}}
		);

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
		await FriendshipRequest.updateOne(
			{_id: requestId},
			{$set: {status: 'rejected'}}
		);

		return friendRequest; // Return the updated request
	}

	async getAllFriendRequests(userId: string): Promise<IFriendshipRequest[]> {
		const pendingForUser = await FriendshipRequest.find({
			userPending: userId,
			status: 'pending',
		});

		const pendingByUser = await FriendshipRequest.find({
			userRequested: userId,
			status: 'pending',
		});

		const response: IFriendshipRequest[] = [];
		pendingForUser.forEach((request) => {
			response.push(request.toObject());
		});

		pendingByUser.forEach((request) => {
			response.push(request.toObject());
		});

		return response;
	}
}

export const friendService = new FriendService();
