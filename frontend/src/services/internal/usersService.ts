import { callApi } from '../../utils';
import { IUser, IUserDetails } from '../../models';


const userService = {
	async createUser(userDetails: IUserDetails, userId: string): Promise<IUser> {
		return callApi('users', {
			method: 'POST',
			body: userDetails,
		}, userId);
	},
	async getUserById(userId: string): Promise<IUser> {
		return callApi(`users/${userId}`);
	},
	async getWithClerkDetails(userId: string): Promise<IUser> {
		return callApi(`users/full/${userId}`);
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
