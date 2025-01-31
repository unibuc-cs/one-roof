import { expect } from 'chai';
import mongoose from 'mongoose';
import { beforeAll, afterEach, describe, test } from '@jest/globals';
import { User } from '../../src/models';
import { userService } from '../../src/services/userService';

describe('UserService Integration Tests', () => {
	let clerkId;

	beforeAll(() => {
		clerkId = new mongoose.Types.ObjectId().toString();
	});

	afterEach(async () => {
		await User.deleteMany();
	});

	test('Should create a new user', async () => {
		const user = await userService.createUser(clerkId, 'Landlord', 1, 'profile.jpg');

		expect(user).to.have.property('_id');
		expect(user?.clerkId).to.equal(clerkId);
		expect(user?.role).to.equal('landlord');
		expect(user?.onboardingStep).to.equal(1);
		expect(user?.profilePicture).to.equal('profile.jpg');
	});

	test('Should retrieve all users', async () => {
		await userService.createUser(clerkId, 'Landlord', 1);
		const users = await userService.getAllUsers();
		expect(users).to.have.length(1);
	});

	test('Should retrieve a user by Clerk ID', async () => {
		await userService.createUser(clerkId, 'Landlord', 1);
		const user = await userService.getUserByClerkId(clerkId);
		expect(user).to.exist;
		expect(user?.clerkId).to.equal(clerkId);
	});

	test('Should update a user by Clerk ID', async () => {
		await userService.createUser(clerkId, 'Landlord', 1);
		const updatedUser = await userService.updateUserByClerkId(clerkId, { onboardingStep: 2 });
		expect(updatedUser?.onboardingStep).to.equal(2);
	});

	test('Should delete a user by Clerk ID', async () => {
		await userService.createUser(clerkId, 'Landlord', 1);
		await userService.deleteUserByClerkId(clerkId);
		const user = await userService.getUserByClerkId(clerkId);
		expect(user).to.not.exist;
	});

});
