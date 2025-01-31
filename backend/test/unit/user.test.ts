import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import {User} from '../../src/models';
import {USERS} from '../../src/database';

const {expect} = chai;

describe('User Model', () => {
	let userMock;

	before(() => {
		// Setup a mock for User
		userMock = sinon.mock(User);
	});

	after(() => {
		// Restore the mock
		userMock.restore();
	});

	const LANDLORD_USER = USERS[0];

	it('should create a new regular user', async () => {
		userMock.expects('create').withArgs(LANDLORD_USER).resolves(LANDLORD_USER);

		const result = await User.create(LANDLORD_USER);

		expect(result).to.have.property('clerkId', 'user_2pwGRzshslTfPL09YP5S4jzVV7N');
		expect(result).to.have.property('role', 'landlord');
		userMock.verify();
	});

	it('should update a user by id', async () => {
		const userId = new mongoose.Types.ObjectId();
		const updatedData = {role: 'updatedRole'};
		const updatedUser = {
			_id: userId,
			...updatedData
		};

		userMock.expects('findByIdAndUpdate').withArgs(userId, updatedData, {new: true}).resolves(updatedUser);

		const result = await User.findByIdAndUpdate(userId, updatedData, {new: true});

		expect(result).to.have.property('role', 'updatedRole');
		userMock.verify();
	});

	it('should delete a user by id', async () => {
		const userId = new mongoose.Types.ObjectId();

		userMock.expects('findByIdAndDelete').withArgs(userId).resolves({_id: userId});

		const result = await User.findByIdAndDelete(userId);

		expect(result).to.have.property('_id', userId);
		userMock.verify();
	});
});
