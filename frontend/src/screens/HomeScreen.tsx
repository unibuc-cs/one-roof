import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SignOutButton } from '../components';
import Button from '../components/Button';
import userService from '../api/services/usersService';
import { useUser } from '@clerk/clerk-expo';

export const HomeScreen = () => {
	const { user } = useUser();
	return (
		<View>
			<Text>Home Screen</Text>
			<SignOutButton />
			<Button mode="contained" onPress={() => userService.getWithClerkDetails(user?.id as string)}>Get All Users</Button>
		</View>
	);
};
