import { callApi } from '../../utils';


export const notificationService = {
    async sendNotification(title: string, body: string, clerkId: string, pushToken: string): Promise<void> {
        return callApi(`notifications/send/${pushToken}`, {
            method: 'POST',
            body: {
                title,
                body,
            }
        }, clerkId);
    },

    async sendFriendRequestNotification(receivingUser, sendingUser) {
        const pushTokens = receivingUser?.pushTokens as string[];
        for (const token of pushTokens) {
            await notificationService.sendNotification("New friend request", `Friend Request from: ${sendingUser.firstName} ${sendingUser.lastName}`, receivingUser.clerkId as string, token);
        }
    }
};