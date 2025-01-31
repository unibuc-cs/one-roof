import Expo from 'expo-server-sdk';

const expo = new Expo();

export const NotificationService ={
	sendNotification: async (pushToken: string, title: string, body: string) => {
		try {
			return await expo.sendPushNotificationsAsync([
				{
					to: pushToken,
					title: title,
					body: body,
				}]);
		}catch(err) {
			console.error(err);
			return undefined;
		}
	}
};