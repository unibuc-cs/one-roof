import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useUserDetails } from '../contexts/UserDetailsContext';
import userService from '../services/internal/userService';
import { FurtherDetailsRegistrationScreen } from './FurtherDetailsRegistrationScreen';
import { CreateReviewScreen } from './review-creation';
import { HomeScreen } from './HomeScreen';

export const OnboardingDecisionScreen = () => {
	const {
		onboardingStep,
		setContactedUsers,
		setOnboardingStep,
		setProfilePictureUrl,
		setRole,
		setUserId
	} = useUserDetails();
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			const userId = user.id;
			fetchAndStoreUserDetails(userId)
				.then((res) => console.log('res', res))
				.catch((err) => console.log('err', err))
				.finally(() => console.log('finally'));
		}
	}, [user, onboardingStep]);

	const fetchAndStoreUserDetails = async (userId: string) => {
		let userDetails;
		try {
			userDetails = await userService.getUserByClerkId(userId);
			setRole(userDetails.role);
			setOnboardingStep(userDetails.onboardingStep);
			setProfilePictureUrl(userDetails.profilePicture);
			setUserId(userDetails._id);
			setContactedUsers(userDetails.contactedUsers);
		} catch (err) {
			// do nothing - if the user is not found, it means they will be created in the next step
		}
	};

	switch (onboardingStep) {
	case 1:
		return <FurtherDetailsRegistrationScreen/>;
	case 2:
		return <CreateReviewScreen/>;
	case 3:
		return <HomeScreen/>;
	}
};