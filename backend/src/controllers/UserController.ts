import {Router} from 'express';

export const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
	try {
		const clerkId = req.body.clerkId;
		const {profilePicture, role, onboardingStep} = req.body;
		console.log('Creating user with clerkId:', clerkId);
		console.log('Creating user with profilePicture:', profilePicture);
		console.log('Creating user with role:', role);
		console.log('Creating user with onboardingStep:', onboardingStep);
		// const newUser = await userService.createUser({ clerkId, profilePicture, role, onboardingStep });
		res.status(201).json(null);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error creating user' });
	}
});
