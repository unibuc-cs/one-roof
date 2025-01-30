import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { capitalize } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { HeaderText } from '../base/HeaderText';
import { theme } from '../../theme';
import { IUserWithClerk } from '../../models';


export const FriendsList: React.FC<{ friends: IUserWithClerk[] }> = ({ friends }) => {
	const navigation = useNavigation();

	const handleSendMessage = async ({ friendId }) => {
		navigation.navigate('Messages', { receiverId: friendId, referenceId: null, type: null });
	};

	return (
		<FlatList
			data={friends}
			keyExtractor={(friend) => `${friend._id}`}
			renderItem={({ item }) => (
				<View style={styles.card}>
					<Text style={styles.friendName}>
						{capitalize(`${item.firstName} ${item.lastName}`.trim())}
					</Text>
					<TouchableOpacity
						style={styles.chatButton}
						onPress={() => handleSendMessage({ friendId: item.clerkId })}
					>
						<Text style={styles.chatButtonText}>Go to Chat</Text>
					</TouchableOpacity>
				</View>
			)}
			ListEmptyComponent={<HeaderText size={24}>You have no friends yet!</HeaderText>}
		/>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 16,
		backgroundColor: '#f9f9f9',
		marginBottom: 8,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	friendName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	chatButton: {
		backgroundColor: theme.colors.primary,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 4,
	},
	chatButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

