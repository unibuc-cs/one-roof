import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from '../theme';
import { Button } from './Button';
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
	currentUserId
}) => {
	const navigation = useNavigation();

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
			<Button onPress={handleSendMessage} mode={'elevated'} disabled={currentUserId === roommate.clerkId}>
                Send a Message
			</Button>
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

