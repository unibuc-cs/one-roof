import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { friendService } from '../services/internal/friendService';
import { useUser } from '@clerk/clerk-expo';
import userService from '../services/internal/userService';
import { IFullFriendRequest } from '../models/friendRequestModel';
import { useFocusEffect } from '@react-navigation/native';
import { FriendshipRequestsList } from '../components/friends/FriendshipRequestsList';
import { theme } from '../theme';
import { IUserWithClerk } from '../models';
import { FriendsList } from '../components/friends/FriendshipsList';


export const FriendsScreen: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<'All' | 'Requests'>('All');
	const [friends, setFriends] = useState<IUserWithClerk[]>([]);
	const [friendRequests, setFriendRequests] = useState<IFullFriendRequest[]>([]);
	const [loading, setLoading] = useState(false);

	const { user } = useUser();
	const currentUserId = user?.id as string;

	const fetchFriends = async () => {
		try {
			setLoading(true);
			const fetchedFriends = await friendService.getAllFriends(currentUserId);
			const friendsWithNames = await Promise.all(
				fetchedFriends.map(async (friend) => {
					const otherUserId = friend.firstUser === currentUserId ? friend.secondUser : friend.firstUser;
					return await userService.getFullUserByClerkId(otherUserId);
				})
			);
			setFriends(friendsWithNames);
		} catch (error) {
			console.error('Error fetching friends:', error);
			Alert.alert('Error', 'Failed to fetch friends');
		} finally {
			setLoading(false);
		}
	};

	const fetchFriendRequests = async () => {
		try {
			setLoading(true);
			const fetchedRequests = await friendService.getAllFriendRequests(currentUserId);
			const fullRequests: IFullFriendRequest[] = await Promise.all(
				fetchedRequests.map(async (request) => {
					const firstUser = await userService.getFullUserByClerkId(request.userRequested);
					const secondUser = await userService.getFullUserByClerkId(request.userPending);
					return {
						...request,
						userRequested: firstUser,
						userPending: secondUser,
					};
				})
			);
			setFriendRequests(fullRequests);
		} catch (error) {
			console.error('Error fetching friend requests:', error);
			Alert.alert('Error', 'Failed to fetch friend requests');
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			if (selectedTab === 'All') {
				fetchFriends();
			} else if (selectedTab === 'Requests') {
				fetchFriendRequests();
			}
		}, [selectedTab, currentUserId])
	);

	const acceptFriendRequest = async (requestId: string) => {
		try {
			setLoading(true);

			await friendService.acceptRequest(requestId);

			await fetchFriends();

			await fetchFriendRequests();

		} catch (error) {
			console.error('Error accepting friend request:', error);
			Alert.alert('Error', 'Failed to accept friend request');
		} finally {
			setLoading(false);
		}
	};

	const rejectFriendRequest = async (requestId: string) => {
		try {
			setLoading(true);

			await friendService.rejectRequest(requestId);

			await fetchFriends();

			await fetchFriendRequests();

		} catch (error) {
			console.error('Error accepting friend request:', error);
			Alert.alert('Error', 'Failed to accept friend request');
		} finally {
			setLoading(false);
		}
	};

	const renderSegmentContent = () => {
		if (loading) {
			return <ActivityIndicator size="large" color={theme.colors.primary}/>;
		}

		if (selectedTab === 'All') {
			return <FriendsList friends={friends}/>;
			// return (
			// 	<FlatList
			// 		data={friends}
			// 		keyExtractor={(item) => `${item.firstUser}-${item.secondUser}`}
			// 		renderItem={({ item }) => (
			// 			<View style={styles.card}>
			// 				<Text style={styles.friendName}>
			// 					{capitalize(`${item.otherUserFirstName} ${item.otherUserSecondName}`.trim())}
			// 				</Text>
			// 			</View>
			// 		)}
			// 		ListEmptyComponent={<HeaderText size={24}>You have no friends yet!</HeaderText>}
			// 	/>
		} else if (selectedTab === 'Requests') {
			return (
				<FriendshipRequestsList
					friendRequests={friendRequests}
					loading={loading}
					onAccept={async (requestId: string) => {
						try {
							await acceptFriendRequest(requestId);
						} catch (error) {
							console.error('Error accepting friend request:', error);
						}
					}}
					onReject={async (requestId: string) => {
						try {
							await rejectFriendRequest(requestId);
							await fetchFriendRequests();
						} catch (error) {
							console.error('Error rejecting friend request:', error);
						}
					}}
				/>

			);
		}
		return null;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Friends</Text>
			<View style={styles.segmentedControl}>
				<TouchableOpacity
					style={[styles.tab, selectedTab === 'All' && styles.activeTab]}
					onPress={() => setSelectedTab('All')}
				>
					<Text style={[styles.tabText, selectedTab === 'All' && styles.activeTabText]}>All</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, selectedTab === 'Requests' && styles.activeTab]}
					onPress={() => setSelectedTab('Requests')}
				>
					<Text style={[styles.tabText, selectedTab === 'Requests' && styles.activeTabText]}>
                        Requests
					</Text>
				</TouchableOpacity>
			</View>
			{renderSegmentContent()}
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 40, // Add padding to move content down
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 16,
	},
	segmentedControl: {
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		marginBottom: 16,
	},
	tab: {
		flex: 1,
		paddingVertical: 10,
		alignItems: 'center',
		borderRadius: 8,
	},
	activeTab: {
		backgroundColor: '#e0e0e0',
	},
	tabText: {
		fontSize: 16,
		color: '#666',
	},
	activeTabText: {
		fontWeight: 'bold',
		color: '#000',
	},
	card: {
		padding: 16,
		backgroundColor: '#f9f9f9',
		marginBottom: 8,
		borderRadius: 8,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 8,
	},
	acceptButton: {
		backgroundColor: '#4CAF50',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 4,
	},
	rejectButton: {
		backgroundColor: '#F44336',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 4,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	friendName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	emptyText: {
		textAlign: 'center',
		color: '#999',
		marginTop: 20,
	},
});

export default FriendsScreen;
