import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { IFullFriendRequest } from '../models/friendRequestModel';
import * as React from 'react';
import { HeaderText } from './HeaderText';
import { Button } from 'react-native-paper';


interface FriendshipRequestsListProps {
    friendRequests: IFullFriendRequest[],
    loading: boolean,
    onAccept: (requestId: string) => void,
    onReject: (requestId: string) => void,
}

export const FriendshipRequestsList: React.FC<FriendshipRequestsListProps> = ({
	friendRequests,
	loading,
	onAccept,
	onReject
}) => {
	const { user } = useUser();

	if (loading) {
		return <ActivityIndicator size="large"/>;
	}

	if (friendRequests.length === 0) {
		return <HeaderText size={24}>You have no pending friend requests!</HeaderText>;
	}

	return (
		<FlatList
			data={friendRequests}
			keyExtractor={(item) => item._id}
			renderItem={({ item }) => {
				const isRequester = item.userRequested.clerkId === user?.id;
				const otherName = isRequester ? `${item.userPending.firstName} ${item.userPending.lastName}` : `${item.userRequested.firstName} ${item.userRequested.lastName}`;

				return (
					<View style={styles.requestItem}>
						<Text style={styles.userName}>
							{otherName}
						</Text>

						{isRequester ? (
							<Text style={styles.pendingText}>Pending</Text>
						) : (
							<View style={styles.buttonsContainer}>
								<Button mode={'contained'} onPress={() => onAccept(item._id)}>Accept</Button>
								<Button mode={'contained-tonal'} onPress={() => onReject(item._id)}>Reject</Button>
							</View>
						)}
					</View>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	requestItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderColor: '#ddd',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	userName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	pendingText: {
		fontSize: 14,
		color: 'gray',
	},
	buttonsContainer: {
		flexDirection: 'row',
		gap: 10,
		flex: 1,
		justifyContent: 'flex-end',
	},
	emptyText: {
		textAlign: 'center',
		fontSize: 16,
		marginTop: 20,
	},
});
