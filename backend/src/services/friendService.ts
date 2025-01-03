
import {FriendshipRequest} from '../models/friendshipRequest';
import {Friendship} from '../models/friendship';

class FriendService {

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

export const friendService = new FriendService();
