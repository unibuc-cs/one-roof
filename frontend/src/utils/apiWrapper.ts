import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import {config} from "../config/configure";

export interface CallApiOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
	body?: any,
	headers?: { [key: string]: string },
}

export async function callApi(endpoint: string, options: CallApiOptions = {}, userId: string = ''): Promise<any> {
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

	if (userId && axiosConfig.headers) {
		axiosConfig.headers['X-Clerk-User-Id'] = userId;
	}

	axiosConfig.data = body;

	console.log(`Calling API with config: ${JSON.stringify(axiosConfig)}`);
	try {
		const response = await axios(axiosConfig);
		if (endpoint !== 'search' && endpoint !== 'listings')
		{
			console.log(`API call succeeded with response : ${JSON.stringify(response.data)}`);
		}
		else {
			console.log ('Api call succeeded, response too long to display');
		}
		return response.data;
	} catch (error) {
		console.error(error);
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data.message || 'API call failed');
		} else {
			throw new Error('An unknown error occurred');
		}
	}
}
