import { callApi } from '../../utils';
import {
	IUser,
	IUserDetails,
	IUserWithClerk,
	IUserWithCompatibilityScore,
} from '../../models';
import { getUserRoleEnumFromString } from '../../enums';

const userService = {
	async createUser(
		userDetails: IUserDetails,
		userId: string,
	): Promise<IUser> {
		return callApi(
			'users',
			{
				method: 'POST',
				body: userDetails,
			},
			userId,
		);
	},

	async getFullUserByClerkId(userId: string): Promise<IUserWithClerk> {
		return callApi(`users/full/${userId}`);
	},
	async getWithClerkDetailsByUserId(userId: string) {
		return callApi(`users/fullByUserId/${userId}`);
	},
	async updateUser(
		userId: string,
		updates: Partial<IUserDetails>,
	): Promise<IUser> {
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

	async updateUserByClerkId(
		clerkId: string,
		updates: Partial<IUserDetails>,
	): Promise<IUser> {
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
	async submitRoommateQuiz(
		userId: string,
		roommateQuizValues: any,
	): Promise<void> {
		return callApi(`users/roommateQuiz/${userId}`, {
			method: 'POST',
			body: roommateQuizValues,
		});
	},
	async getCompatibleRoommates(
		userId: string,
	): Promise<IUserWithCompatibilityScore[]> {
		return callApi(`users/compatibleRoommates/${userId}`);
	},
};

export default userService;
