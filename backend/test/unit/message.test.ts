import { assert } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { MessageService } from '../../src/services/messageService';
import { Message, IMessage } from '../../src/models';

describe('MessageService', function () {
	let messageMock: sinon.SinonMock;
	let message1: IMessage;
	let message2: IMessage;

	const messageId1 = new mongoose.Types.ObjectId('677d29e11f85a5f15d176496');
	const messageId2 = new mongoose.Types.ObjectId();
	const referenceId = new mongoose.Types.ObjectId('677827bee58ccf33eb95ae4c');

	beforeEach(() => {
		messageMock = sinon.mock(Message);

		message1 ={
			_id: messageId1,
			senderId: 'user_2pFdO8l7IY4dkjYToLN1WtF3JCU',
			receiverId: 'user_2qMCwflcPjsmCdBexwZZXcmAEuR',
			content: 'Hello',
			isRead: false,
			referenceId,
			type: 'review',
			createdAt: new Date(),
			updatedAt: new Date(),
		}  as unknown as IMessage;

		message2 = {
			_id: messageId2,
			senderId: 'user_2qMCwflcPjsmCdBexwZZXcmAEuR',
			receiverId: 'user_2pFdO8l7IY4dkjYToLN1WtF3JCU',
			content: 'Hi there!',
			isRead: true,
			referenceId,
			type: 'chat',
			createdAt: new Date(),
			updatedAt: new Date(),
		} as unknown as  IMessage;
	});

	afterEach(() => {
		sinon.restore();
	});

	describe('uploadMessage', function () {
		it('should save a new message', async function () {


			messageMock.expects('create').withArgs(messageMock).returns(message1);

			return MessageService.uploadMessage(message1).then((result) => {
				assert.deepEqual(result, message1);
				messageMock.verify();
			});
		});
	});


	describe('getConversationMessages', function () {
		it('should return messages between two users', async function () {
			messageMock
				.expects('find')
				.withArgs({
					$or: [
						{ senderId: message1.senderId, receiverId: message1.receiverId },
						{ senderId: message1.receiverId, receiverId: message1.senderId },
					],
				})
				.resolves([message1, message2]);

			const result = await MessageService.getConversationMessages(
				message1.senderId,
				message1.receiverId
			);
			assert.deepEqual(result, [message1, message2]);

			messageMock.verify();
		});
	});

	describe('updateMessage', function () {
		it('should update message content', async function () {
			const updatedMessage = { ...message1, content: 'Updated content' };

			messageMock
				.expects('findOneAndUpdate')
				.withArgs({ _id: messageId1 }, { content: 'Updated content' })
				.resolves(updatedMessage);

			const result = await MessageService.updateMessage(messageId1, { content: 'Updated content' });
			assert.deepEqual(result, updatedMessage);

			messageMock.verify();
		});
	});
});
