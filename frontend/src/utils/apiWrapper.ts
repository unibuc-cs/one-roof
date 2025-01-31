import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../config/configure';

export interface CallApiOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
	body?: any,
	headers?: { [key: string]: string },
}

export async function callApi(
	endpoint: string,
	options: CallApiOptions = {},
	userId: string = '',
): Promise<any> {
	const { method = 'GET', body = null, headers = {} } = options;

	const axiosConfig: AxiosRequestConfig = {
		method,
		url: `${config.api.baseUrl}/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		data: body,
	};

	if (userId) {
		axiosConfig.headers['X-Clerk-User-Id'] = userId;
	}

	console.log(`Calling API: ${axiosConfig.method} ${axiosConfig.url}`);

	try {
		const response = await axios(axiosConfig);

		// Truncate response data for logging
		const responseData = JSON.stringify(response.data);
		const truncatedData =
			responseData.length > 500
				? responseData.substring(0, 500) + '...'
				: responseData;

		// Log status and response
		console.log(`✅ API call succeeded. Status: ${response.status}`);
		console.log(`📩 Response data: ${truncatedData}`);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status || 'Unknown';
			const errorMessage =
				error.response?.data?.message || 'API call failed';

			console.error(`❌ API call failed. Status: ${status}`);
			console.error(
				`🔴 Error message: ${JSON.stringify(error.response?.statusText)} - ${JSON.stringify(error.response?.data)}`,
			);

			throw new Error(errorMessage);
		} else {
			console.error(`❌ An unknown error occurred: ${error}`);
			throw new Error('An unknown error occurred');
		}
	}
}
