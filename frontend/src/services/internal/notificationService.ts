import {callApi} from "../../utils";


export const notificationService = {
    async sendNotification(title: string, body: string, clerkId: string){
        return callApi('notifications', {
            method: 'POST',
            body: {
                title,
                body,
            }
        }, clerkId);
    }
}