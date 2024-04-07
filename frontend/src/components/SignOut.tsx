import React from 'react';
import { View } from 'react-native';
import  Button from './Button';
import { useAuth } from '@clerk/clerk-expo';

export const SignOut = () => {
	const { isLoaded, signOut } = useAuth();
	if (!isLoaded) {
		return null;
	}
	return (
		<View>
			<Button mode="contained" onPress={() => signOut()}>Sign Out</Button>
		</View>
	);
};
