import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '../components/SignOutButton';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { FurtherDetailsRegistrationScreen } from './FurtherDetailsRegistrationScreen';
import { CreateReviewScreen } from './CreateReviewScreen';
import { HomeScreen } from './HomeScreen';
import userService from '../api/services/usersService';

export const OnboardingDecisionScreen: React.FC = () => {
	const { onboardingStep, setOnboardingStep, setProfilePicture, setRole } = useUserDetails();
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
		setProfilePicture(userDetails.profilePicture);
	};

	switch (onboardingStep) {
	case 1:
		return <FurtherDetailsRegistrationScreen />;
	case 2:
		return <CreateReviewScreen />;
	default:
		return <HomeScreen />;
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
