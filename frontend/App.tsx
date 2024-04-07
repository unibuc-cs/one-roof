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
import Button from './src/components/Button';
import {fetchDiscoveryAsync} from 'expo-auth-session';
import {UnauthenticatedHomeScreen} from './src/screens/UnauthenticatedHomeScreen';

export default function App() {
	const [myData, setMyData] = useState<string>('');

	const fetchData = async (): Promise<void> => {
		try {
			console.log('Fetching data...');
			const url = `${config.api.baseUrl}/api/secret`;
			console.log('URL:', url);
			const response = await axios.get<string>(url);
			console.log('Data fetched:', response.data);
			setMyData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<PaperProvider theme={theme}>
				<SignedIn>
					<Background>
						<Text> You are signed in! </Text>
						<Button mode="contained" onPress={fetchData}>
                            Fetch Data
						</Button>
						<SignOut/>
					</Background>
				</SignedIn>
				<SignedOut>
					<UnauthenticatedHomeScreen />
				</SignedOut>
			</PaperProvider>
		</ClerkProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
