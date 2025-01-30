import { callApi } from '../../utils';
import { IUser, IUserDetails, IUserWithCompatibilityScore } from '../../models';
import { getUserRoleEnumFromString } from '../../enums';


const userService = {
	async createUser(userDetails: IUserDetails, userId: string): Promise<IUser> {
		return callApi('users', {
			method: 'POST',
			body: userDetails,
		}, userId);
	},
	async getUserById(userId: string): Promise<IUser> {
		const user: any = await callApi(`users/${userId}`, {}, userId);
		user.role = getUserRoleEnumFromString(user.role);
		return user;
	},
	async getUserByClerkId(clerkId: string): Promise<IUser | null> {
		console.log('getUserByClerkId', clerkId);
		const user: any = await callApi(`users/${clerkId}`, {}, clerkId);
		user.role = getUserRoleEnumFromString(user.role);
		return user;
	},
	async getFullUserByClerkId(userId: string): Promise<IUser> {
		return callApi(`users/full/${userId}`);
	},
	async getWithClerkDetailsByUserId(userId: string) {
		return callApi(`users/fullByUserId/${userId}`);
	},
	async updateUser(userId: string, updates: Partial<IUserDetails>): Promise<IUser> {
		return callApi(`users/${userId}`, {
			method: 'PUT',
			body: updates,
		});
	},

	async updateUserWithClerk(updates: Partial<IUserDetails>): Promise<IUser> {
		return callApi('users', {
			method: 'PUT',
			body: updates,
		});
	},

	async updateUserByClerkId(clerkId: string, updates: Partial<IUserDetails>): Promise<IUser> {
		return callApi(`clerk/users/${clerkId}`, {
			method: 'PUT',
			body: updates,
		});
	},
	async deleteUser(userId: string): Promise<IUser> {
		return callApi(`users/${userId}`, {
			method: 'DELETE',
		});
	},
	async getAllUsers(): Promise<IUser[]> {
		return callApi('users');
	},
	async submitRoommateQuiz(userId: string, roommateQuizValues: any): Promise<void> {
		return callApi(`users/roommateQuiz/${userId}`, {
			method: 'POST',
			body: roommateQuizValues,
		});
	},
	async getCompatibleRoommates(userId: string): Promise<IUserWithCompatibilityScore[]> {
		return callApi(`users/compatibleRoommates/${userId}`);
	}
};

export default userService;
