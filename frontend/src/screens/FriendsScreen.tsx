import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';

export const FriendsScreen: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<'All' | 'Requests'>('All');

	// Mock data for friends and friend requests
	const [friendRequests, setFriendRequests] = useState([
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);

	const [friends, setFriends] = useState([
		{ id: '3', name: 'Charlie' },
		{ id: '4', name: 'Diana' },
	]);

	// Handle accepting a friend request
	const handleAccept = (requestId: string) => {
		const acceptedRequest = friendRequests.find((request) => request.id === requestId);
		if (acceptedRequest) {
			setFriends([...friends, acceptedRequest]); // Add to friends list
			setFriendRequests(friendRequests.filter((request) => request.id !== requestId)); // Remove from requests
			Alert.alert('Friend Request', `${acceptedRequest.name} is now your friend!`);
		}
	};

	// Handle rejecting a friend request
	const handleReject = (requestId: string) => {
		const rejectedRequest = friendRequests.find((request) => request.id === requestId);
		if (rejectedRequest) {
			setFriendRequests(friendRequests.filter((request) => request.id !== requestId)); // Remove from requests
			Alert.alert('Friend Request', `You rejected ${rejectedRequest.name}'s friend request.`);
		}
	};

	const renderSegmentContent = () => {
		if (selectedTab === 'All') {
			return (
				<FlatList
					data={friends}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.card}>
							<Text style={styles.friendName}>{item.name}</Text>
						</View>
					)}
					ListEmptyComponent={<Text style={styles.emptyText}>You have no friends yet</Text>}
				/>
			);
		} else if (selectedTab === 'Requests') {
			return (
				<FlatList
					data={friendRequests}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.card}>
							<Text style={styles.friendName}>{item.name} sent you a friend request</Text>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={styles.acceptButton}
									onPress={() => handleAccept(item.id)}
								>
									<Text style={styles.buttonText}>Accept</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.rejectButton}
									onPress={() => handleReject(item.id)}
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
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Friends</Text>

			{/* Segmented Control */}
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

			{/* Render selected tab content */}
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
