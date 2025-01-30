import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from '../theme';
import { Button } from './base/Button';
import { useUser } from '@clerk/clerk-expo';
import { friendService } from '../services/internal/friendService';
import { useNavigation } from '@react-navigation/native';

interface CompatibleRoommateCardProps {
    roommate: {
        firstName: string,
        lastName: string,
        profilePicture: string,
        clerkId: string,
    },
    compatibilityScore: number,
    currentUserId?: string,
}

export const CompatibleRoommateCard: React.FC<CompatibleRoommateCardProps> = ({
	roommate,
	compatibilityScore,
}) => {
	const navigation = useNavigation();
	const { user: clerkUser } = useUser();
	const [friendshipStatus, setFriendshipStatus] = useState<'none' | 'pending' | 'friends'>('none');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchFriendshipStatus = async () => {
			if (clerkUser?.id) {
				try {
					const status = await friendService.getStatus(clerkUser.id, roommate.clerkId);
					setFriendshipStatus(status);
				} catch (error) {
					console.error('Error fetching friendship status:', error);
				}
			}
		};

		fetchFriendshipStatus();
	}, [clerkUser?.id, roommate.clerkId]);

	const handleSendFriendRequest = async () => {
		if (!clerkUser?.id) return;
		setLoading(true);
		try {
			await friendService.sendRequest(roommate.clerkId, clerkUser.id);
			setFriendshipStatus('pending'); // ✅ Optimistically update UI
		} catch (error) {
			console.error('Error sending friend request:', error);
		} finally {
			setLoading(false);
		}
	};

	const renderFriendButton = () => {
		switch (friendshipStatus) {
		case 'none':
			return (
				<Button onPress={handleSendFriendRequest} mode='elevated' loading={loading}>
                        Add Friend
				</Button>
			);
		case 'pending':
			return <Button mode='elevated' disabled><Text style={{ color: 'lightyellow' }}>Pending</Text></Button>;
		case 'friends':
			return <Button mode='elevated' disabled><Text style={{ color: 'lightblue' }}>Already
                    Friends</Text></Button>;
		default:
			return null;
		}
	};

	const handleSendMessage = async () => {
		navigation.navigate('Messages', { receiverId: roommate.clerkId, referenceId: null, type: null });
	};

	return (
		<Card style={styles.container}>
			<View style={styles.row}>
				<Image style={styles.profilePicture} source={{ uri: roommate.profilePicture }}/>
				<View>
					<Text style={styles.name}>{roommate.firstName} {roommate.lastName}</Text>
					<Text style={styles.score}>Compatibility: {Math.round(compatibilityScore * 100)}%</Text>
				</View>
			</View>
			<View style={{ paddingTop: 15 }}>
				<Button marginVertical={0} onPress={handleSendMessage} mode="elevated">
                    Send a Message
				</Button>
				{renderFriendButton()}
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		width: '80%',
		marginVertical: 5,
		backgroundColor: theme.colors.primary,
	},
	title: {
		fontFamily: 'ProximaNova-Bold',
		fontSize: 20,
		color: 'white',
		marginBottom: 10,
	},
	row: {
		alignItems: 'center',
	},
	profilePicture: {
		width: 110,
		height: 110,
		borderRadius: 40,
		marginRight: 10,
		marginBottom: 15,
	},
	name: {
		fontSize: 18,
		fontFamily: 'ProximaNova-Bold',
		color: 'white',
		textAlign: 'center',
	},
	score: {
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'Proxima-Nova/Regular',
		color: 'white',
	},
});

