import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useUserDetails } from '../contexts/UserDetailsContext';
import userService from '../services/internal/userService';
import { FurtherDetailsRegistrationScreen } from './FurtherDetailsRegistrationScreen';
import { CreateReviewScreen } from './review-creation';
import { HomeScreen } from './HomeScreen';

export const OnboardingDecisionScreen = () => {
	const { onboardingStep } = useUserDetails();

	switch (onboardingStep) {
	case 1:
		return <FurtherDetailsRegistrationScreen/>;
	case 2:
		return <CreateReviewScreen/>;
	case 3:
		return <HomeScreen/>;
	}
};
