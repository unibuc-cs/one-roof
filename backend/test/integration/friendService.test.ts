import {expect} from 'chai';
import mongoose from 'mongoose';
import {friendService} from '../../src/services/friendService';
import {FriendshipRequest} from '../../src/models/friendshipRequest';
import {Friendship} from '../../src/models/friendship';
import {beforeAll} from '@jest/globals';

describe('FriendService Integration Tests', () => {
	let senderId: string, receiverId: string;

	beforeAll(() => {
		senderId = new mongoose.Types.ObjectId().toString();
		receiverId = new mongoose.Types.ObjectId().toString();
	});

	afterEach(async () => {
		await FriendshipRequest.deleteMany();
		await Friendship.deleteMany();
	});

	test('Should create a new friend request', async () => {
		const request = await friendService.createFriendRequest(senderId, receiverId);

		expect(request).to.have.property('_id');
		expect(request.userRequested).to.equal(senderId);
		expect(request.userPending).to.equal(receiverId);
		expect(request.status).to.equal('pending');

		// ✅ Check MongoDB
		const savedRequest = await FriendshipRequest.findOne({userRequested: senderId, userPending: receiverId});
		expect(savedRequest).to.exist;
	});

	test('Should not allow duplicate friend requests', async () => {
		await friendService.createFriendRequest(senderId, receiverId);

		try {
			await friendService.createFriendRequest(senderId, receiverId);
			throw new Error('Expected an error but none was thrown');
		} catch (error: any) {
			expect(error.message).to.equal('Friend request already sent');
		}
	});

	test('Should accept a friend request and create a friendship', async () => {
		const request = await friendService.createFriendRequest(senderId, receiverId);
		const friendship = await friendService.acceptFriendRequest(request._id.toString());

		// test that FriendshipRequest no longer exists
		const deletedRequest = await FriendshipRequest.findById(request._id);
		expect(deletedRequest).to.not.exist;

		// verify Friendship creation
		const savedFriendship = await Friendship.findOne({firstUser: senderId, secondUser: receiverId});
		expect(savedFriendship).to.exist;
	});

	test('Should reject a friend request', async () => {
		const request = await friendService.createFriendRequest(senderId, receiverId);
		await friendService.rejectFriendRequest(request._id.toString());

		// test that FriendshipRequest no longer exists
		const rejectedRequest = await FriendshipRequest.findById(request._id);
		expect(rejectedRequest).to.not.exist;

		// check they are not friends either
		const friendship = await Friendship.findOne({firstUser: senderId, secondUser: receiverId});
		expect(friendship).to.not.exist;
	});

	test('Should retrieve all pending friend requests for a user', async () => {
		await friendService.createFriendRequest(senderId, receiverId);
		await friendService.createFriendRequest(receiverId, senderId);

		const requests = await friendService.getAllFriendRequests(senderId);
		expect(requests).to.have.length(2);
	});
});
