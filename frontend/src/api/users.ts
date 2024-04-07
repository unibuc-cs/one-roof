import { CallApiOptions, callApi } from './wrapper'; // Adjust the import path as needed

// TODO: fix this rewrite
type UserDetails = {
	onboardingStep: number,
	profilePicture: string,
	role: string,
};

const userService = {
	async createUser(userDetails: UserDetails, userId: string): Promise<any> {
		return callApi('users', {
			method: 'POST',
			body: userDetails,
		}, userId);
	},
	async getUserById(userId: string): Promise<any> {
		return callApi(`users/${userId}`);
	},
	async updateUser(userId: string, updates: Partial<UserDetails>): Promise<any> {
		return callApi(`users/${userId}`, {
			method: 'PUT',
			body: updates,
		});
	},
	async deleteUser(userId: string): Promise<any> {
		return callApi(`users/${userId}`, {
			method: 'DELETE',
		});
	},
};

export default userService;
