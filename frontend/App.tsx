import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HomeScreen } from './src/screens';
import { config } from './src/configure';
import axios from 'axios';
import { AuthProvider } from './src/auth/useAuth';

export default function App() {
    const [myData, setMyData] = useState<string>('');
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await axios.get<string>(`${config.api.baseUrl}/api`);
                setMyData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <AuthProvider>
            <HomeScreen myData={myData} />
        </AuthProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
