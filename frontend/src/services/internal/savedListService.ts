import { callApi } from '../../utils';

export const savedListService = {
    createSavedList: (data: any, ownerId: string) => {
        return callApi('savedlists', {method: 'POST', body: data}, ownerId);
    },

    getSavedList: (id: string) => { // , ownerId: string
		return callApi(`savedlists/${id}`, {});
	},

	getAllSavedLists: () => {
		return callApi('savedlists'); // implicit get?
	},

	updateSavedList: (id: string, data: any, ownerId: string) => {
		return callApi(`savedlists/${id}`, { method: 'PUT', body: data }, ownerId);
	}
}