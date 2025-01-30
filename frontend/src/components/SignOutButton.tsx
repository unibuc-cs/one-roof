import React from 'react';
import { View } from 'react-native';
import Button from './base/Button';
import { useAuth } from '@clerk/clerk-expo';

export const SignOutButton = () => {
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
