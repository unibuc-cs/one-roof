import { callApi } from '../../utils';
import { IUser, IUserDetails } from '../../models';
import { getUserRoleEnumFromString, UserRoleEnum } from '../../enums';


const userService = {
	async createUser(userDetails: IUserDetails, userId: string): Promise<IUser> {
		return callApi('users', {
			method: 'POST',
			body: userDetails,
		}, userId);
	},
	async getUserByClerkId(clerkId: string): Promise<IUser> {
		const user: any = await callApi(`users/${clerkId}`);
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
		return callApi(`users/${userId}`, {
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
