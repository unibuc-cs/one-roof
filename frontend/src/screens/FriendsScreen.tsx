import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import { friendService } from '../services/internal/friendService';
import { IFriendship } from '../models/friendshipModel';
import { useUser } from '@clerk/clerk-expo';
import userService from '../services/internal/userService';
import { IFriendRequest } from '../models/friendRequestModel';



export const FriendsScreen: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<'All' | 'Requests'>('All');
	const [friends, setFriends] = useState<any[]>([]);
	const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>([]);
	const [loading, setLoading] = useState(false);

	const { user } = useUser();
	const userId = user?.id as string;

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				setLoading(true);
				const fetchedFriends = await friendService.getAllFriends(userId);
				const friendsWithNames = await Promise.all(
					fetchedFriends.map(async (friend) => {
						const otherUserId =
							friend.firstUser === userId ? friend.secondUser : friend.firstUser;
						const otherUser = await userService.getUserByClerkId(otherUserId);
						const otherUserWithName = await  userService.getWithClerkDetailsByUserId(otherUser._id);
						return {
							...friend,
							otherUserFirstName: otherUserWithName?.firstName || 'Unknown',
							otherUserSecondName: otherUserWithName?.lastName || '',
						};
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
				const fetchedRequests = await friendService.getAllFriendRequests(userId);
				const requestsWithNames = await Promise.all(
					fetchedRequests.map(async (request) => {
						const otherUserId = request.requestedUser;
						const otherUser = await userService.getUserByClerkId(otherUserId);
						const otherUserWithName = await  userService.getWithClerkDetailsByUserId(otherUser._id);
						return {
							...request,
							otherUserRequestFirstName: otherUserWithName?.firstName || 'Unknown',
							otherUserRequestSecondName: otherUserWithName?.lastName || '',
						};
					})
				);
				setFriendRequests(requestsWithNames);
			} catch (error) {
				console.error('Error fetching friend requests:', error);
				Alert.alert('Error', 'Failed to fetch friend requests');
			} finally {
				setLoading(false);
			}
		};

		if (selectedTab === 'All') {
			fetchFriends();
		} else if (selectedTab === 'Requests') {
			fetchFriendRequests();
		}
	}, [selectedTab]);

	const acceptFriendRequest = async (requestId: string) => {
		try {
			setLoading(true);

			// Call the API to accept the friend request
			await friendService.acceptRequest({ userId }, requestId); // Assuming data needed in the body is { userId }

			// Remove the accepted request from the state
			setFriendRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));

			// Optionally, add the new friendship to the state (depending on how your API works)
			// Add it to the friends list, assuming we get it from the API or know the second user's ID
			const acceptedRequest = friendRequests.find(req => req._id === requestId);
			if (acceptedRequest) {
				setFriends(prevFriends => [
					...prevFriends,
					{
						firstUser: acceptedRequest.requestedUser,
						secondUser: acceptedRequest.pendingUser,
						// Include first and last names if needed
						otherUserFirstName: acceptedRequest.otherUserRequestFirstName,
						otherUserSecondName: acceptedRequest.otherUserRequestSecondName,
					},
				]);
			}

			Alert.alert('Success', 'Friend request accepted!');
		} catch (error) {
			console.error('Error accepting friend request:', error);
			Alert.alert('Error', 'Failed to accept friend request');
		} finally {
			setLoading(false);
		}
	};
	const renderSegmentContent = () => {
		if (loading) {
			return <ActivityIndicator size="large" color="#0000ff" />;
		}

		const capitalize = (str: string): string =>
			str
				.toLowerCase()
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');

		if (selectedTab === 'All') {
			return (
				<FlatList
					data={friends}
					keyExtractor={(item) => `${item.firstUser}-${item.secondUser}`}
					renderItem={({ item }) => (
						<View style={styles.card}>
							<Text style={styles.friendName}>
								{capitalize(`${item.otherUserFirstName} ${item.otherUserSecondName}`.trim())}
							</Text>
						</View>
					)}
					ListEmptyComponent={<Text style={styles.emptyText}>You have no friends yet</Text>}
				/>
			);
		} else if (selectedTab === 'Requests') {
			return (
				<FlatList
					data={friendRequests}
					keyExtractor={(item) => `${item.requestedUser}-${item.pendingUser}`}
					renderItem={({ item }) => (
						<View style={styles.card}>
							<Text style={styles.friendName}>
								{capitalize(`${item.otherUserRequestFirstName} ${item.otherUserRequestSecondName}`.trim())}
							</Text>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={styles.acceptButton}
									onPress={() => console.log('Accept', item)}
								>
									<Text style={styles.buttonText}>Accept</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.rejectButton}
									onPress={() => console.log('Reject', item)}
								>
									<Text style={styles.buttonText}>Reject</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					ListEmptyComponent={<Text style={styles.emptyText}>No friend requests</Text>}
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
