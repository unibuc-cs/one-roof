import { User } from '../../models';

export const REGULAR_USER = new User({
	clerkId: 'clerk|regularuser123',
	profilePicture: 'https://example.com/path/to/regularuser/profilepic.jpg',
	role: 'regularUser',
	onboardingStep: 1,
});

export const LANDLORD_USER = new User({
	clerkId: 'clerk|landlorduser123',
	profilePicture: 'https://example.com/path/to/landlord/profilepic.jpg',
	role: 'landlord',
	onboardingStep: 1,
});

const USERS = [REGULAR_USER, LANDLORD_USER];

export { USERS };


