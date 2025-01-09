import { callApi } from '../../utils';

export const viewingService = {
    createViewing: (data: any, userId: string) => {
        return callApi('viewings', { method: 'POST', body: data }, userId);
    },

    getViewing : (id: string, userId: string) => {
        return callApi(`viewings/${id}`, {}, userId);
    },

    getUserViewings : (userId: string) => {
        return callApi(`viewings/user/${userId}`, {}, userId);
    },

    getConfirmedViewings : (userId: string) => {
        return callApi(`viewings/confirmed/${userId}`, {}, userId);
    },

    updateViewing : (id: string, data: any, userId: string) => {
        return callApi(`viewings/${id}`, { method: 'PUT', body: data }, userId);
    },

    confirmViewing : (id: string, userId: string) => {
        return callApi(`viewings/confirm/${id}`, { method: 'PUT' }, userId);
    },

    rejectViewing : (id: string, userId: string) => {
        return callApi(`viewings/reject/${id}`, { method: 'PUT' }, userId);
    },

    deleteViewing : (id: string, userId: string) => {
        return callApi(`viewings/${id}`, { method: 'DELETE' }, userId);
    }
};