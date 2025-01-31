import { callApi } from '../../utils';
import { IFriendship } from '../../models/friendshipModel';
import { IFriendRequest } from '../../models/friendRequestModel';

export const friendService = {
	async sendRequest(receiverId: string, senderId: string): Promise<void> {
		return callApi(
			'friends',
			{ method: 'POST', body: { receiverId } },
			senderId,
		);
	},
	async acceptRequest(requestId: string): Promise<void> {
		return callApi('friends/acceptById', {
			method: 'POST',
			body: JSON.stringify({ requestId }), // ✅ Send requestId in the body
		});
	},

	async rejectRequest(requestId: string): Promise<void> {
		return callApi('friends/rejectById', {
			method: 'POST',
			body: JSON.stringify({ requestId }), // ✅ Send requestId in the body
		});
	},

	async getAllFriends(userId: string): Promise<IFriendship[]> {
		return callApi(`friends/allFriends/${userId}`);
	},
	async getAllFriendRequests(userId: string): Promise<IFriendRequest[]> {
		return callApi(`friends/allFriendRequests/${userId}`);
	},
	async getStatus(
		userAId: string,
		userBId: string,
	): Promise<'friends' | 'pending' | 'none'> {
		const userAFriends = await this.getAllFriends(userAId);
		if (
			userAFriends.some(
				(friend) =>
					friend.firstUser === userBId ||
					friend.secondUser === userBId,
			)
		) {
			return 'friends';
		}
		const userAFriendRequests = await this.getAllFriendRequests(userAId);
		if (
			userAFriendRequests.some(
				(request) =>
					request.userRequested === userBId ||
					request.userPending === userBId,
			)
		) {
			return 'pending';
		}
		return 'none';
	},
};
