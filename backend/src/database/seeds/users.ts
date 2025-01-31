import {User} from '../../models';

export const SEED_LANDLORD_USER = new User({
	clerkId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
	role: 'landlord',
	onboardingStep: 3,
	gender: 'female',
	profilePicture: 'https://media.gettyimages.com/id/1067934132/photo/colorful-bird-perching.jpg?s=612x612&w=gi&k=20&c=o4tAbo-qa1vH8REUznIpvujZ2SNNUbYcOD7JKll4lo4='
});

export const USERS = [SEED_LANDLORD_USER];

