import { expect } from 'chai';
import { NotificationService } from '../../src/services/notificationService';
import Expo from 'expo-server-sdk';
import sinon from "sinon";

describe('NotificationService', () => {
	let sendPushNotificationsAsyncMock: sinon.SinonMock;

	beforeEach(() => {
		// Mock Expo's sendPushNotificationsAsync method before each test
		sendPushNotificationsAsyncMock = sinon.mock(Expo.prototype);
	});

	afterEach(() => {
		// Restore the original function after each test
		sendPushNotificationsAsyncMock.restore();
	});

	it('should send a notification successfully', async () => {
		// Arrange: Prepare mock behavior for the Expo SDK
		const mockResponse = [{ status: 'ok' }];
		sendPushNotificationsAsyncMock.expects('sendPushNotificationsAsync').once().resolves(mockResponse);

		// Act: Call the method
		const pushToken = 'some-push-token';
		const title = 'Test Title';
		const body = 'Test Body';
		const result = await NotificationService.sendNotification(pushToken, title, body);

		// Assert: Ensure the response is as expected
		expect(result).to.deep.equal(mockResponse);
		sendPushNotificationsAsyncMock.verify();
	});

	it('should handle errors and return undefined', async () => {
		// Arrange: Prepare mock to throw an error
		sendPushNotificationsAsyncMock.expects('sendPushNotificationsAsync').once().rejects(new Error('Something went wrong'));

		// Act: Call the method with error-prone scenario
		const pushToken = 'some-push-token';
		const title = 'Test Title';
		const body = 'Test Body';
		const result = await NotificationService.sendNotification(pushToken, title, body);

		// Assert: Ensure it returns undefined and logs the error
		expect(result).to.be.undefined;
		sendPushNotificationsAsyncMock.verify();
	});
});
