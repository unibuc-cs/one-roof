import React from 'react';
import { Card, Text } from 'react-native-paper';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { useUserDataByClerkId } from '../hooks/useUserData';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';

const ReachOutToUser: React.FC<any> = ({ message, userToReachOutToId, referenceId, type }) => {
	const { navigate } = useNavigation();

	const { user: landlord } = useUserDataByClerkId(userToReachOutToId);
	const { user } = useUser();

	if (!landlord) {
		return <ActivityIndicator size="large" color={theme.colors.primary}/>;
	}

	const userCreatedAt = new Date(landlord.createdAt);
	const year = userCreatedAt.getFullYear();
	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	const monthName = monthNames[userCreatedAt.getMonth()];
	const yearMonth = `${monthName} ${year}`;

	const handleSendMessage = async () => {
		navigate('Messages', { receiverId: landlord.clerkId, referenceId: referenceId, type: type });
	};

	return (
		<Card style={styles.container}>
			<Text style={styles.landlordTitle}>{message}</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image style={styles.landlordProfilePicture} source={{ uri: landlord.profilePicture }}/>
				<View>
					<Text style={styles.landlordName}>{landlord.lastName} {landlord.firstName}</Text>
					<Text style={styles.date}>With us since: {yearMonth}</Text>
				</View>
			</View>
			<Button mode={'elevated'} disabled={user?.id === landlord.clerkId} onPress={handleSendMessage}>Send a
                message</Button>
		</Card>
	);
};
//TODO: add on press for button
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingBottom: 5,
		marginVertical: 5,
		backgroundColor: theme.colors.primary,
		color: 'white',
		fontFamily: 'Proxima-Nova/Regular',
	},
	landlordTitle: {
		fontFamily: 'ProximaNova-Bold',
		fontSize: 20,
		paddingHorizontal: 5,
		color: 'white',
		marginBottom: 10,
	},
	landlordProfilePicture: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 5,
	},
	landlordName: {
		fontSize: 20,
		marginBottom: 5,
		fontFamily: 'ProximaNova-Bold',
		color: 'white',
	},
	date: {
		fontSize: 16,
		marginBottom: 5,
		fontFamily: 'Proxima-Nova/Regular',
		color: 'white',
	},
});

export default ReachOutToUser;
