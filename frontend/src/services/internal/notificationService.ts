import {callApi} from "../../utils";


export const notificationService = {
    async sendNotification(title: string, body: string, clerkId: string, pushToken: string): Promise<void> {
        return callApi(`notifications/send/${pushToken}`, {
            method: 'POST',
            body: {
                title,
                body,
            }
        }, clerkId);
    }
}