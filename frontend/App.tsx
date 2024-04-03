import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { config } from './configure';
import axios from 'axios';

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
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Text>response {myData}</Text>
            <StatusBar style="auto" />
        </View>
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
