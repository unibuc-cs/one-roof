import React, { createContext, ReactNode, useContext, useState } from 'react';
import { UserRoleEnum } from '../enums';

interface UserDetails {
    resetUserDetails: () => void,
	onboardingStep: number,
	setOnboardingStep: React.Dispatch<React.SetStateAction<number>>,
	profilePictureUrl?: string,
	setProfilePictureUrl: React.Dispatch<React.SetStateAction<string>>,
	role: UserRoleEnum,
	setRole: React.Dispatch<React.SetStateAction<UserRoleEnum>>,
	userId: string,
	setUserId: React.Dispatch<React.SetStateAction<string>>,
	contactedUsers: string[],
	setContactedUsers: React.Dispatch<React.SetStateAction<string[]>>,
	favoriteListings: string[],
	setFavoriteListings: React.Dispatch<React.SetStateAction<string[]>>,
	savedLists: string[],
	setSavedLists: React.Dispatch<React.SetStateAction<string[]>>,
	viewedListings: string[],
	setViewedListings: React.Dispatch<React.SetStateAction<string[]>>,
}

const defaultUserDetails: UserDetails = {
	onboardingStep: 1,
	setOnboardingStep: () => {
	},
	profilePictureUrl: '',
	setProfilePictureUrl: () => {
	},
	role: UserRoleEnum.RegularUser,
	setRole: () => {
	},
	userId: '',
	setUserId: () => {
	},
	contactedUsers: [],
	setContactedUsers: () => {
	},
	favoriteListings: [],
	setFavoriteListings: () => {},
	savedLists: [],
	setSavedLists: () => {},
	viewedListings: [],
	setViewedListings: () => {},
	resetUserDetails: () => {
	},
};

const UserDetailsContext = createContext<UserDetails>(defaultUserDetails);

interface UserDetailsProviderProps {
    children: ReactNode,
}

export const UserDetailsProvider: React.FC<UserDetailsProviderProps> = ({ children }) => {
	const [onboardingStep, setOnboardingStep] = useState<number>(1);
	const [profilePicture, setProfilePicture] = useState<string>('');
	const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.RegularUser);
	const [userId, setUserId] = useState<string>('');
	const [contactedUsers, setContactedUsers] = useState<string[]>([]);
	const [favoriteListings, setFavoriteListings] = useState<string[]>([]);
	const [savedLists, setSavedLists] = useState<string[]>([]);
	const [viewedListings, setViewedListings] = useState<string[]>([]);

	const resetUserDetails = () => {
		setOnboardingStep(1);
		setProfilePicture('');
		setRole(UserRoleEnum.RegularUser);
		setUserId('');
		setContactedUsers([]);
		setFavoriteListings([]);
	};
	
	return (
		<UserDetailsContext.Provider value={{ viewedListings, setViewedListings, favoriteListings, setFavoriteListings, savedLists, setSavedLists, onboardingStep, setOnboardingStep, profilePictureUrl: profilePicture, setProfilePictureUrl: setProfilePicture, role, setRole, userId, setUserId, contactedUsers, setContactedUsers, resetUserDetails}}>
			{children}
		</UserDetailsContext.Provider>
	);
};

export const useUserDetails = () => useContext(UserDetailsContext);
