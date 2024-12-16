import { callApi } from '../../utils';
import { IMessage } from '../../models/messageModel';

export const friendService = {
	async uploadMessage(data: any, userId: string): Promise<IMessage> {
		return callApi('messages', { method: 'POST', body: data });
	},
	async getConversationMessages(senderId: string, receiverId: string): Promise<IMessage[]> {
		return callApi(`messages/${senderId}/${receiverId}`);
	},
	async updateMessage(id: string, data: any): Promise<IMessage> {
		return callApi(`messages/${id}`, {
			method: 'PUT',
			body:data
		});

	}
};

export const friendService = {
	sendRequest: (data: any, userId: string) => {
		return callApi('friends', { method: 'POST', body: data });
	},
	acceptRequest: (data: any, requestId: string) => {
		return callApi(`friends/acceptById/${requestId}`, { method: 'POST', body: data });
	},
	rejectRequest: (data: any, requestId: string) => {
		return callApi(`friends/rejectById/${requestId}`, { method: 'POST', body: data });
	},
	sendRequest: (data: any, userId: string) => {
		return callApi('friends', { method: 'POST', body: data });
	},
	async getConversationMessages(senderId: string, receiverId: string): Promise<IMessage[]> {
		return callApi(`messages/${senderId}/${receiverId}`);
	},
	async updateMessage(id: string, data: any): Promise<IMessage> {
		return callApi(`messages/${id}`, {
			method: 'PUT',
			body:data
		});

	}
};

messageRouter.post('/', MessageController.uploadMessage);
messageRouter.get('/:senderId/:receiverId', MessageController.getConversationMessages);
messageRouter.put('/:id', MessageController.updateMessage);

friendRouter.post('/', FriendController.createFriendRequest);
friendRouter.post('/acceptById/:requestId', FriendController.acceptFriendRequest);
friendRouter.post('/rejectById/:requestId', FriendController.rejectFriendRequest);
friendRouter.get('/allFriends', FriendController.getAllFriends);
friendRouter.get('/allFriendRequests', FriendController.getFriendRequest);