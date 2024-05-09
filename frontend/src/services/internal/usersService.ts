import { CallApiOptions, callApi } from '../../utils/apiWrapper';

// TODO: fix this rewrite
// TODO: fix any's
type UserDetails = {
	onboardingStep: number,
	profilePicture: string,
	role: string,
};

type User = UserDetails & {
	clerkId: string,
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
	async getWithClerkDetails(userId: string): Promise<any> {
		return callApi(`users/full/${userId}`);
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
	async getAllUsers(): Promise<User[]> {
		return callApi('users');
	}
};

export default userService;
