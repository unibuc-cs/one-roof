import React, { useCallback, useState } from 'react';
import { Background } from '../../components';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Surface } from 'react-native-paper';
// import Button from '../../components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { useUser } from '@clerk/clerk-expo';
import userService from '../../services/internal/userService';
import { IUserWithClerk } from '../../models';

export const RoommateScreen: React.FC = () => {
	const navigation = useNavigation();
	const { user: clerkUser } = useUser();
	const [user, setUser] = useState<IUserWithClerk | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			setIsLoading(true);
			userService.getFullUserByClerkId(clerkUser?.id || '')
				.then(data => {
					setUser(data);
					setIsLoading(false);
				})
				.catch(err => {
					setIsLoading(false);
				});
		}, [clerkUser?.id])
	);

	if (isLoading) {
		return <ActivityIndicator size={'large'} color={theme.colors.primary}/>;
	}

	const hasTakenQuiz = user?.roommateQuiz !== undefined && user?.roommateQuiz !== null;

	const getButton = ({ text, onPress }) => {
		return (<Surface mode='elevated'
			style={{
				padding: 16,
				borderRadius: 16,
				marginTop: 16,
				backgroundColor: theme.colors.inverseSurface
			}}>
			<TouchableOpacity onPress={onPress} style={{
				flexWrap: 'wrap',
				alignItems: 'center',
				justifyContent: 'center',
				height: 'auto',
			}}>
				<View style={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{
						fontSize: 24,
						textAlign: 'center',
						color: 'white',
						fontFamily: 'ProximaNova-Bold'
					}} numberOfLines={0}>{text}</Text>
				</View>
			</TouchableOpacity>
		</Surface>);
	};

	const handleBrowseRoommates = () => {
		navigation.navigate('BrowseRoommates');
	};

	const handleTakeQuiz = () => {
		navigation.navigate('RoommateQuiz');
	};

	const takeQuizButton = hasTakenQuiz ? getButton({
		text: 'Retake the Roommate Quiz',
		onPress: handleTakeQuiz
	}) : getButton({ text: 'Take the Roommate Quiz', onPress: handleTakeQuiz });

	const browseRoommatesButton = getButton({ text: 'Browse Roommates', onPress: handleBrowseRoommates });
	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				{hasTakenQuiz && browseRoommatesButton}
				{takeQuizButton}
			</Card>
		</Background>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		backgroundColor: 'white',
		padding: 16,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
		width: '70%',
		gap: 20
	},
});
