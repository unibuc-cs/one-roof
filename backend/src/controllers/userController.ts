import { userService } from '../services';
import { IUser } from '../models';

export const UserController = {
	createUser: async (req, res) => {
		try {
			const clerkId = req.headers['x-clerk-user-id'];
			const { profilePicture, role, onboardingStep } = req.body;
			const newUser = await userService.createUser(clerkId, role, onboardingStep, profilePicture);
			res.status(201).json(newUser);
		} catch (error) {
			res.status(500).json({ error: 'Error creating user' });
		}
	},

	updateUser: async (req, res) => {
		try {
			const clerkId = req.params.clerkId;
			const updates = req.body;
			const updatedUser = await userService.updateUserByClerkId(clerkId, updates);
			console.log(clerkId, updates);
			updatedUser ? res.json(updatedUser) : res.status(404).json({ error: 'User not found' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error updating user' });
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const users = await userService.getAllUsers();
			res.json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error fetching users' });
		}
	},

	getUser: async (req, res) => {
		try {
			const clerkId = req.params.clerkId;
			const user = await userService.getUserByClerkId(clerkId);
			user ? res.json(user) : res.status(404).json({ error: 'User not found' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error fetching user' });
		}
	},

	getFullUser: async (req, res) => {
		try {
			const clerkId = req.params.clerkId;
			const user = await userService.getUserWithClerkDetails(clerkId);
			user ? res.json(user) : res.status(404).json({ error: 'User not found' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error fetching user' });
		}
	},

	getFullUserByUserId: async (req, res) => {
		try {
			console.log('AICI 3');
			const userId = req.params.userId;
			const user = await userService.getUserWithClerkDetailsByUserId(userId);
			user ? res.json(user) : res.status(404).json({error: 'User not found'});
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error fetching user'});
		}
	},
	createFriendRequest: async (req, res) => {
		try {
			const senderId = req.headers['x-clerk-user-id'] as string; // Extract sender (logged-in user) from headers
			const { receiverId } = req.body; // Extract receiver (target user) from body

			if (!senderId || !receiverId) {
				res.status(400).json({ error: 'Sender and receiver IDs are required' });
				return;
			}

			// Call the service to create the friend request
			const friendRequest = await userService.createFriendRequest(senderId, receiverId);

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

			const friendship = await userService.acceptFriendRequest(requestId, userId);
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

			const friendRequest = await userService.rejectFriendRequest(requestId);
			res.status(200).json(friendRequest); // Return the updated request
		} catch (error) {
			res.status(500).json({ error: 'Error rejecting friend request'});
		}
	}
};
