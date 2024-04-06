import React, { useEffect, useState } from 'react';
import { config } from './src/configure';
import axios from 'axios';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { tokenCache } from './src/auth/tokenCache';
import { PaperProvider } from 'react-native-paper';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { theme } from './src/theme';
import Background from './src/components/Background';
import { SignOut } from './src/components';
import SignInScreen from './src/screens/SignInScreen';
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from '@env';

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
        <ClerkProvider
            tokenCache={tokenCache}
            publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <PaperProvider theme={theme}>
                <SignedIn>
                    <Background>
                        <Text> You are signed in! </Text>
                        <SignOut/>
                    </Background>
                </SignedIn>
                <SignedOut>
                    <SignInScreen/>
                </SignedOut>
            </PaperProvider>
        </ClerkProvider>
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
