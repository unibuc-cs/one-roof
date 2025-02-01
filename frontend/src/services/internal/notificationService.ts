import { callApi } from '../../utils';
import {IUserWithClerk} from "../../models";
import {IMessage} from "../../models/messageModel";


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
        const revPushTokens = pushTokens.reverse();
        await notificationService.sendNotification("New friend request", `Friend Request from: ${sendingUser.firstName} ${sendingUser.lastName}`, receivingUser.clerkId as string, revPushTokens[0]);


        // for (const token of pushTokens) {
        //     await notificationService.sendNotification("New friend request", `Friend Request from: ${sendingUser.firstName} ${sendingUser.lastName}`, receivingUser.clerkId as string, token);
        // }
    },

    async sendNewMessageNotification(receivingUser: IUserWithClerk | null, message: IMessage) {
        const pushTokens = receivingUser?.pushTokens as string[];
        const revPushTokens = pushTokens.reverse();
        await notificationService.sendNotification('New message', message.content, receivingUser.clerkId, revPushTokens[0]);

        // for (const token of pushTokens) {
        //     await notificationService.sendNotification('New message', msg.content, userId, token);
        // }
    }
};