
import {friendService} from '../services/friendService';
import {FriendshipRequest} from '../models/friendshipRequest';
import {Friendship} from '../models/friendship';


export const FriendController = {

	createFriendRequest: async (req, res) => {
		try {
			const senderId = req.headers['x-clerk-user-id'] as string; // Extract sender (logged-in user) from headers
			const { receiverId } = req.body; // Extract receiver (target user) from body

			if (!senderId || !receiverId) {
				res.status(400).json({ error: 'Sender and receiver IDs are required' });
				return;
			}

			// Call the service to create the friend request
			const friendRequest = await friendService.createFriendRequest(senderId, receiverId);

			res.status(201).json(friendRequest); // Return the created friend request object
		} catch (error) {
			res.status(500).json({ error: 'Error creating friend request' });
		}
	},
	acceptFriendRequest: async (req, res) => {
		try {
			const requestId = req.params.requestId; // Friend request ID from URL
			const userId = req.headers['x-clerk-user-id'] as string; // The user accepting the request

			if (!userId || !requestId) {
				res.status(400).json({ error: 'User ID and request ID are required' });
				return;
			}

			const friendship = await friendService.acceptFriendRequest(requestId, userId);
			res.status(200).json(friendship); // Return the created friendship
		} catch (error) {
			res.status(500).json({ error: 'Error accepting friend request' });
		}
	},

	// Method to reject a Friend Request
	rejectFriendRequest: async (req, res) => {
		try {
			const requestId = req.params.requestId; // Friend request ID from URL

			if (!requestId) {
				res.status(400).json({ error: 'Request ID is required' });
				return;
			}

			const friendRequest = await friendService.rejectFriendRequest(requestId);
			res.status(200).json(friendRequest); // Return the updated request
		} catch (error) {
			res.status(500).json({ error: 'Error rejecting friend request'});
		}
	},
	getFriendRequest: async (req, res) => {
		const { userId } = req.params;
		const requests = await FriendshipRequest.find({
			$or: [{ userRequested: userId }, { userPending: userId }],
			status: 'pending',
		});
		res.json(requests);
	},

	// Endpoint to get all friends for a user
	getAllFriends: async (req, res) => {
		const { userId } = req.params;
		const friends = await Friendship.find({
			$or: [{ firstUser: userId }, { secondUser: userId }],
		});
		res.json(friends);
	}
};
