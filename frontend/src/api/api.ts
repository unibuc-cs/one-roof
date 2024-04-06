import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_HOST } from '@env';
import axios, { type AxiosResponse } from 'axios';

const baseUrl = `http://${API_HOST}/api`;

async function getWithToken(url: string): Promise<AxiosResponse> {
    const token = await AsyncStorage.getItem('accessToken');
    return await axios.get(`${baseUrl}${url}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
