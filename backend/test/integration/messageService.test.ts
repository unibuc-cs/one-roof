import { expect } from 'chai';
import mongoose from 'mongoose';

import { Message } from '../../src/models';
import { beforeAll, afterEach, describe, test } from '@jest/globals';
import { MessageService } from '../../src/services/messageService';

describe('MessageService Integration Tests', () => {
	let senderId, receiverId;

	beforeAll(() => {
		senderId = new mongoose.Types.ObjectId().toString();
		receiverId = new mongoose.Types.ObjectId().toString();
	});

	afterEach(async () => {
		await Message.deleteMany();
	});

	test('Should upload a new message', async () => {
		const messageBody = new Message({ senderId, receiverId, content: 'Hello, World!', isRead: false });
		const message = await MessageService.uploadMessage(messageBody);

		expect(message).to.have.property('_id');
		expect(message.senderId).to.equal(senderId);
		expect(message.receiverId).to.equal(receiverId);
		expect(message.content).to.equal('Hello, World!');

		const savedMessage = await Message.findById(message._id);
		expect(savedMessage).to.exist;
	});

	test('Should retrieve conversation messages', async () => {
		await MessageService.uploadMessage(new Message({ senderId, receiverId, content: 'Message 1', isRead: false }));
		await MessageService.uploadMessage(new Message({ senderId: receiverId, receiverId: senderId, content: 'Message 2', isRead: false }));

		const messages = await MessageService.getConversationMessages(senderId, receiverId);
		expect(messages).to.have.length(2);
		expect(messages[0].content).to.equal('Message 1');
		expect(messages[1].content).to.equal('Message 2');
	});

	test('Should update a message', async () => {
		const message = await MessageService.uploadMessage(new Message({ senderId, receiverId, content: 'Old Content', isRead: false }));
		await MessageService.updateMessage(message._id, { content: 'Updated Content' });

		const updatedMessage = await Message.findById(message._id);
		expect(updatedMessage?.content).to.equal('Updated Content');
	});
});