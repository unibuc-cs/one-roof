import React, {useEffect, useState} from 'react';
import { Card, Text } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { useUserData } from '../hooks/useUserData';
import Button from '../components/Button';
import { useCustomFonts } from '../hooks/useCustomFonts';
import {useUser} from "@clerk/clerk-expo";
import {useUserDetails} from "../contexts/UserDetailsContext";

// TODO: add loading

const LandlordDetails: React.FC<any> = ({ landlordID }) => {
	const customFont = useCustomFonts();
	// const [landlord, setLandlord] = useState(null);
	const { user } =  useUserData(landlordID);

	if(user == null){
		return <Text>Error - landlord not found</Text>;
	}
	const userCreatedAt = new Date(user.createdAt);
	const year = userCreatedAt.getFullYear();
	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const monthName = monthNames[userCreatedAt.getMonth()];
	const yearMonth = `${monthName} ${year}`;
	return (
		<Card style={styles.container}>
			<Text style={styles.landlordTitle}>Contact the landlord</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image style={styles.landlordProfilePicture} source={{ uri: user.profilePicture }} />
				<View>
					<Text style={styles.landlordName}>{user.lastName} {user.firstName}</Text>
					<Text style={styles.date}>With us since: {yearMonth}</Text>
				</View>
			</View>
			<Button mode={'elevated'}>Send a message</Button>
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
		fontFamily: 'ProximaNova-Regular',
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
		marginRight:5,
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
		fontFamily: 'ProximaNova-Regular',
		color: 'white',
	},
});

export default LandlordDetails;
