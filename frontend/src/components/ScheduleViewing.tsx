import React, { useState } from 'react';
import { Card, Text } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from '../components';
import { theme } from '../theme';
import { useUser } from '@clerk/clerk-expo';
import { useUserDataByClerkId } from '../hooks/useUserData';
import { viewingService } from '../services';

export const ScheduleViewing: React.FC = ({ listingId, landlordId, listingTitle, listingAddress }) => {
	const [date, setDate] = useState(new Date());
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const { user } = useUser();
	const { user: landlord } = useUserDataByClerkId(landlordId);

	const handleSubmit = async (values: any) => {
		const viewingData = {
			userId: user?.id as string,
			listingId: listingId,
			title: listingTitle,
			address: listingAddress,
			landlordId: landlord?.clerkId as string,
			viewingDate: date,
			status: 'not confirmed'
		};

		try {
			const response = await viewingService.createViewing(viewingData, user?.id as string);
			console.log('response', response);
		} catch (error) {
			console.error('Error submitting viewing', error);
		}
	};

	return (
		<Card style={styles.container}>
			<Text style={styles.title}>Schedule a Viewing!</Text>
			<Text style={styles.infoText}>Your selected time:</Text>
			<Text style={styles.timeText}>{date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})}</Text>
			<Button style={styles.button} onPress={() => setDatePickerVisibility(true)}><Text style={styles.buttonText}>Choose
                time for Viewing</Text></Button>
			<Button style={styles.button} onPress={handleSubmit}><Text style={styles.buttonText}>Schedule Viewing</Text></Button>
			<DateTimePickerModal
				mode="datetime"
				isVisible={isDatePickerVisible}
				date={date}
				onConfirm={(date) => {
					setDate(date);
					setDatePickerVisibility(false);
				}}
				onCancel={() => setDatePickerVisibility(false)}
			/>
		</Card>
	);
};

const styles = {
	timeText: {
		color: 'black',
		fontSize: 14,
	},
	infoText: {
		color: 'black',
		fontSize: 16,
		fontFamily: 'ProximaNova-Bold'
	},
	container: {
		flex: 1,
		padding: 10,
		paddingBottom: 5,
		marginVertical: 5,
		fontFamily: 'Proxima-Nova/Regular'
	},
	button: {
		backgroundColor: theme.colors.primary,
		marginBottom: 0,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold',
	},
	title: {
		fontSize: 20,
		marginBottom: 5,
		fontFamily: 'ProximaNova-Bold',
		color: theme.colors.primary
	}
};