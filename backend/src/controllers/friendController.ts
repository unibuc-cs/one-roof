import {friendService} from '../services/friendService';
import {Friendship} from '../models/friendship';
import {IFriendshipRequest} from '../models/friendshipRequest';


export const FriendController = {

	createFriendRequest: async (req, res) => {
		try {
			const senderId = req.headers['x-clerk-user-id'] as string; // Extract sender (logged-in user) from headers
			const {receiverId} = req.body; // Extract receiver (target user) from body

			if (!senderId || !receiverId) {
				res.status(400).json({error: 'Sender and receiver IDs are required'});
				return;
			}

			// Call the service to create the friend request
			const friendRequest = await friendService.createFriendRequest(senderId, receiverId);

			res.status(201).json(friendRequest); // Return the created friend request object
		} catch (error) {
			res.status(500).json({error: 'Error creating friend request'});
		}
	},
	acceptFriendRequest: async (req, res) => {
		try {
			const {requestId} = req.body; // ✅ Get requestId from body

			if (!requestId) {
				return res.status(400).json({error: 'Request ID is required'});
			}

			const friendship = await friendService.acceptFriendRequest(requestId);
			res.status(200).json(friendship);
		} catch (error) {
			res.status(500).json({error: `Error accepting friend request ${error}`});
		}
	},

	rejectFriendRequest: async (req, res) => {
		try {
			const {requestId} = req.body; // ✅ Get requestId from body

			if (!requestId) {
				return res.status(400).json({error: 'Request ID is required'});
			}

			const friendRequest = await friendService.rejectFriendRequest(requestId);
			res.status(200).json(friendRequest);
		} catch (error) {
			res.status(500).json({error: `Error rejecting friend request ${error}`});
		}
	},

	getAllFriendRequests: async (req, res) => {
		const {userId} = req.params;
		try {
			if (!userId) {
				res.status(400).json({error: 'User ID is required'});
				return;
			}
			const requests: IFriendshipRequest[] = await friendService.getAllFriendRequests(userId);
			res.status(200).json(requests);
		} catch (err) {
			res.status(500).json({error: 'Error getting friend requests'});
		}
	},

	// Endpoint to get all friends for a user
	getAllFriends: async (req, res) => {
		const {userId} = req.params;
		const friends = await Friendship.find({
			$or: [{firstUser: userId}, {secondUser: userId}],
		});
		res.json(friends);
	}
};
