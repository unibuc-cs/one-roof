import React from 'react';
import { View, Text } from 'react-native';
import { SignOutButton } from '../components';
import Button from '../components/Button';
import userService from '../api/users';

export const HomeScreen = () => {
	return (
		<View>
			<Text>Home Screen</Text>
			<SignOutButton />
			<Button mode="contained" onPress={() => userService.getAll()}>Get All Users</Button>
		</View>
	);
};
