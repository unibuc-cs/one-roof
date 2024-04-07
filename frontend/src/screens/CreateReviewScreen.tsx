import React from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Button';
import { useUserDetails } from '../contexts/UserDetailsContext';

export const CreateReviewScreen: React.FC = () => {
	const { onboardingStep, setOnboardingStep } = useUserDetails();
	return (
		<View>
			<Text style={{ fontSize: 40 }} >TODO: Create Review Screen</Text>
			<Button mode="contained" onPress={() => setOnboardingStep(onboardingStep + 1)}>
				Continue
			</Button>
		</View>
	);
};
