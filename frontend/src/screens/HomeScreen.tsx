import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useUser } from '@clerk/clerk-expo';
import { SignOut as SignOutButton } from '../components/SignOut';

export const HomeScreen: React.FC = () => {
	const { user } = useUser();
	return (
		<View style={styles.container}>
			<Text> {user?.fullName} </Text>
			<SignOutButton />
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
