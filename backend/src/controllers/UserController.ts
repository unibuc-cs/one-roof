import {Router} from 'express';
import {userService} from '../services/UserService';

export const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
	try {
		console.log(req);
		const clerkId = req.headers['x-clerk-user-id'] as string;
		const {profilePicture, role, onboardingStep} = req.body;
		console.log('Creating user with clerkId:', clerkId);
		console.log('Creating user with profilePicture:', profilePicture);
		console.log('Creating user with role:', role);
		console.log('Creating user with onboardingStep:', onboardingStep);
		const newUser = await userService.createUser(clerkId, role, onboardingStep, profilePicture);
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error creating user' });
	}
});

usersRouter.put('/:clerkId', async (req, res) => {
	try {
		const clerkId = req.params.clerkId;
		const updates = req.body;
		const updatedUser = await userService.updateUserByClerkId(clerkId, updates);
		if (updatedUser) {
			res.json(updatedUser);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error updating user' });
	}
});

usersRouter.get('/', async (req, res) => {
	try {
		const users = await userService.getAllUsers();
		console.log('Fetched users:', users);
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching users' });
	}
});

usersRouter.get('/:clerkId', async (req, res) => {
	try {
		const clerkId = req.params.clerkId;
		const user = await userService.getUserByClerkId(clerkId);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching user' });
	}
});
