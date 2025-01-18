import { callApi } from '../../utils';
import { IUser, IUserDetails, IUserWithClerk } from '../../models';
import { getUserRoleEnumFromString, UserRoleEnum } from '../../enums';


const userService = {
	async createUser(userDetails: IUserDetails, userId: string): Promise<IUser> {
		return callApi('users', {
			method: 'POST',
			body: userDetails,
		}, userId);
	},
	async getUserByClerkId(clerkId: string): Promise<IUserWithClerk> {
		const user: any = await callApi(`users/full/${clerkId}`, {}, clerkId);
		user.role = getUserRoleEnumFromString(user.role);
		return user;
	},
	async getWithClerkDetails(userId: string): Promise<IUser> {
		return callApi(`users/full/${userId}`);
	},
	async getWithClerkDetailsByUserId(userId: string){
		return callApi(`users/fullByUserId/${userId}`);
	},
	async updateUser(userId: string, updates: Partial<IUserDetails>): Promise<IUser> {
		console.log('before 3', userId);
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
	}
};

export default userService;
