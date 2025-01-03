import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import { friendService } from '../services/internal/friendService';
import { IFriendship } from '../models/friendshipModel';
import { useUser } from '@clerk/clerk-expo';

export const FriendsScreen: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<'All' | 'Requests'>('All');
	const [friends, setFriends] = useState<IFriendship[]>([]);
	const [loading, setLoading] = useState(false);

	// Simulated logged-in user ID (replace with actual logic to get user ID)
	const { user } = useUser();
	const userId = user?.id as string;

	useEffect(() => {
		if (selectedTab === 'All') {
			const fetchFriends = async () => {
				try {
					setLoading(true);
					const fetchedFriends = await friendService.getAllFriends(userId);
					setFriends(fetchedFriends);
				} catch (error) {
					console.error('Error fetching friends:', error);
					Alert.alert('Error', 'Failed to fetch friends');
				} finally {
					setLoading(false);
				}
			};

			fetchFriends();
		}
	}, [selectedTab]);

	const renderSegmentContent = () => {
		if (loading) {
			return <ActivityIndicator size="large" color="#0000ff" />;
		}

		if (selectedTab === 'All') {
			return (
				<FlatList
					data={friends}
					keyExtractor={(item) => item.firstUser + item.secondUser} // Unique key for each friendship
					renderItem={({ item }) => (
						<View style={styles.card}>
							<Text style={styles.friendName}>
								{item.firstUser === userId ? item.secondUser : item.firstUser}
							</Text>
						</View>
					)}
					ListEmptyComponent={<Text style={styles.emptyText}>You have no friends yet</Text>}
				/>
			);
		}
		return null; // Handle 'Requests' tab separately
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
