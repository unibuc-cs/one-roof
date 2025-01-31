import { callApi } from '../../utils';

export const savedListService = {
	createSavedList: (data: any, userId: string) => {
		return callApi('savedlists', { method: 'POST', body: data }, userId);
	},

	getSavedList: (id: string, userId:string) => { // , ownerId: string
		return callApi(`savedlists/${id}`, {}, userId);
	},

	getUserSavedLists: (userId: string) => {
		return callApi(`savedlists/ownerId/${userId}`, {}, userId);
	},

	getAllSavedLists: () => {
		return callApi('savedlists');
	},

	updateSavedList: (id: string, data: any, userId: string) => {
		return callApi(`savedlists/${id}`, { method: 'PUT', body: data }, userId);
	}
};