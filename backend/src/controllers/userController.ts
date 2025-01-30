import {userService} from '../services';

export const UserController = {
	createUser: async (req, res) => {
		try {
			const clerkId = req.headers['x-clerk-user-id'];
			const {profilePicture, role, onboardingStep} = req.body;
			const newUser = await userService.createUser(clerkId, role, onboardingStep, profilePicture);
			res.status(201).json(newUser);
		} catch (error) {
			res.status(500).json({error: 'Error creating user'});
		}
	},

	updateUser: async (req, res) => {
		try {
			const clerkId = req.params.clerkId;
			const updates = req.body;
			const updatedUser = await userService.updateUserByClerkId(clerkId, updates);
			console.log(clerkId, updates);
			updatedUser ? res.json(updatedUser) : res.status(404).json({error: 'User not found in updateUser'});
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error updating user'});
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const users = await userService.getAllUsers();
			res.json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error fetching users'});
		}
	},

	getUser: async (req, res) => {
		try {
			const clerkId = req.params.clerkId;
			const user = await userService.getUserByClerkId(clerkId);
			user ? res.json(user) : res.status(404).json({error: 'User not found in getUser'});
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error fetching user'});
		}
	},

	getFullUserByClerkId: async (req, res) => {
		try {
			const clerkId = req.params.clerkId;
			const user = await userService.getUserWithClerkDetails(clerkId);
			user ? res.json(user) : res.status(404).json({error: 'User not found in getFullUser'});
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error fetching user'});
		}
	},

	getFullUserByUserId: async (req, res) => {
		try {
			const userId = req.params.userId;
			const user = await userService.getUserWithClerkDetailsByUserId(userId);
			user ? res.json(user) : res.status(404).json({error: 'User not found in getFullUserByUserId'});
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error fetching user'});
		}
	},

	submitRoommateQuiz: async (req, res) => {
		try {
			const userId = req.params.userId;
			const roommateQuizValues = req.body;
			await userService.submitRoommateQuiz(userId, roommateQuizValues);
			res.status(201).json({message: 'Roommate quiz submitted'});
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error submitting roommate quiz'});
		}
	},

	getCompatibleRoommates: async (req, res) => {
		try {
			const userId = req.params.userId;
			const compatibleRoommates = await userService.getCompatibleRoommates(userId);
			res.json(compatibleRoommates);
		} catch (error) {
			console.error(error);
			res.status(500).json({error: 'Error fetching compatible roommates'});
		}
	}
};
