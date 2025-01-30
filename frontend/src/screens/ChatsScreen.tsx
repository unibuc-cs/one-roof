import React, { useCallback, useState } from 'react';
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import UserChatCard from '../components/chats/UserChatCard';
import { theme } from '../theme';
import { useUser } from '@clerk/clerk-expo';
import userService from '../services/internal/userService';
import { IUser } from '../models';
import { HeaderText } from '../components';
import { useFocusEffect } from '@react-navigation/native';

export const ChatsScreen: React.FC = () => {
	const { user } = useUser();

	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	useFocusEffect(
		useCallback(() => {
			const fetchUserData = async () => {
				try {
					const ussr = await userService.getUserByClerkId(
						user?.id || '',
					);
					if (ussr) {
						setCurrentUser(ussr);
					}
				} catch (error) {
					console.error('Error fetching user data:', error);
				}
			};

			fetchUserData();
		}, [user?.id]),
	);

	if (!currentUser) {
		return (
			<View
				style={{
					justifyContent: 'center',
					flex: 1,
					alignItems: 'center',
				}}
			>
				<ActivityIndicator
					size={'large'}
					color={theme.colors.primary}
				/>
			</View>
		);
	}

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={styles.container}
		>
			<View style={styles.title}>
				<HeaderText size={24}>Chats</HeaderText>
			</View>
			<Pressable>
				{currentUser?.contactedUsers.map((clerkUserId, index) => (
					<UserChatCard key={index} userId={clerkUserId} />
				))}
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: theme.colors.primary,
		paddingVertical: 15,
		paddingTop: 45,
	},
	container: {
		backgroundColor: 'white',
		minHeight: 'fit-content',
		width: '100%',
		margin: 0,
	},
});
