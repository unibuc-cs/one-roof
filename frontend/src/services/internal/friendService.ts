import { callApi } from '../../utils';

import { string } from 'yup';
import { IFriendship } from '../../models/friendshipModel';

export const friendService = {
	async sendRequest(data: any, userId: string) : Promise<void> {
		return callApi('friends', { method: 'POST', body: data });
	},
	async acceptRequest(data: any, requestId: string): Promise<void> {
		return callApi(`friends/acceptById/${requestId}`, { method: 'POST', body: data });
	},
	async rejectRequest(data: any, requestId: string): Promise<void> {
		return callApi(`friends/rejectById/${requestId}`, { method: 'POST', body: data });
	},
	async getAllFriends(userId: string): Promise<IFriendship[]> {
		return callApi(`friends/allFriends/${userId}`);
	},
	async getAllFriendRequests(data: any, userId: string): Promise<void> {
		return callApi(`friends/allFriendRequests${userId}`);
	},
};


