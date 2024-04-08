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
