import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useUserDetails } from '../../contexts/UserDetailsContext';
import { useUser } from '@clerk/clerk-expo';
import userService from '../../services/internal/userService';
import { Background, Button, HeaderText } from '../../components';
import { Card } from 'react-native-paper';
import { theme } from '../../theme';
import Logo from '../../components/base/Logo';
import { useNavigation } from '@react-navigation/native';

export const CreateReviewScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const { onboardingStep, setOnboardingStep } = useUserDetails();
	const { user } = useUser();

	const isFirstTimeUser = onboardingStep !== 3;
	const handleContinue = async () => {
		if (isFirstTimeUser) {
			const nextOnboardingStep = onboardingStep + 1;
			if (!user || !user.id) {
				throw new Error('User not initialized properly');
			}

			await userService.updateUser(user.id, {
				onboardingStep: nextOnboardingStep,
			});
			setOnboardingStep(nextOnboardingStep);
		}
	};

	const callToAction =
		'Share your thoughts about your current living place and surroundings!';
	const firstTimeMessage =
		'Welcome!\n To benefit from the community\'s knowledge, we first ask you to leave a review of your current or past place of residence.\nYour review will help others make informed decisions.';
	const additionalReviewMessage =
		'We appreciate your willingness to share your experiences and help the community by leaving additional reviews!';
	const welcomingMessage = isFirstTimeUser
		? firstTimeMessage
		: additionalReviewMessage;

	return (
		<Background>
			<Card style={styles.card} contentStyle={styles.container}>
				<View style={styles.flexItem}>
					<HeaderText color={theme.colors.primary} size={32}>
						{callToAction}
					</HeaderText>
				</View>
				<View style={styles.flexItem}>
					<Logo />
				</View>
				<View style={styles.flexItem}>
					<HeaderText size={20}>{welcomingMessage}</HeaderText>
				</View>
				<View style={styles.flexItem}>
					<Button
						mode={'contained'}
						onPress={() =>
							navigation.navigate('ReviewGeneralDetails')
						}
					>
						{isFirstTimeUser
							? 'Start writing your first review!'
							: 'Start writing another review!'}
					</Button>
				</View>
			</Card>
		</Background>
	);
};

const styles = StyleSheet.create({
	card: {
		marginVertical: 30,
		backgroundColor: 'white',
		padding: 16,
		paddingTop: 16,
		maxHeight: '100%',
	},
	container: {
		display: 'flex',
		flexGrow: 1,
	},
	flexItem: {
		flexGrow: 1,
		alignSelf: 'center',
		marginTop: 16,
	},
});
