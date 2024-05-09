import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { FurtherDetailsRegistrationScreen } from './FurtherDetailsRegistrationScreen';
import { CreateReviewScreen } from './CreateReviewScreen';
import userService from '../services/internal/usersService';
import { AppNavigation } from '../components';

export const OnboardingDecisionScreen: React.FC = () => {
	const { onboardingStep, setOnboardingStep, setProfilePictureUrl, setRole } = useUserDetails();
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			const userId = user.id;
			fetchAndStoreUserDetails(userId);
		}
	}, [user]);

	const fetchAndStoreUserDetails = async (userId: string) => {
		const userDetails = await userService.getUserById(userId);
		setRole(userDetails.role);
		setOnboardingStep(userDetails.onboardingStep);
		setProfilePictureUrl(userDetails.profilePicture);
	};

	switch (onboardingStep) {
	case 1:
		return <FurtherDetailsRegistrationScreen />;
	case 2:
		return <CreateReviewScreen />;
	default:
		return <AppNavigation />;
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
